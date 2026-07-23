// components/checkout/PaymentStatusChecker.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Clock } from "lucide-react";

interface PaymentStatusCheckerProps {
  orderId: string;
  onComplete: () => void;
  onFailed: (error: string) => void;
}

export function PaymentStatusChecker({
  orderId,
  onComplete,
  onFailed,
}: PaymentStatusCheckerProps) {
  const [status, setStatus] = useState<"checking" | "success" | "failed">("checking");
  const [message, setMessage] = useState("Waiting for payment confirmation...");
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 30; // 30 seconds timeout

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        setAttempts(prev => prev + 1);

        // Check if we've exceeded max attempts
        if (attempts >= maxAttempts) {
          setStatus("failed");
          setMessage("Payment confirmation timed out. Please check your M-Pesa messages and contact support.");
          onFailed("Payment confirmation timed out");
          return;
        }

        const response = await fetch(`/api/orders/${orderId}/status`);
        const data = await response.json();

        if (data.success) {
          const order = data.order;

          if (order.paymentStatus === "paid") {
            setStatus("success");
            setMessage("Payment confirmed! Your order is being processed.");
            onComplete();
            return;
          }

          if (order.paymentStatus === "failed") {
            setStatus("failed");
            setMessage("Payment failed. Please try again.");
            onFailed("Payment failed");
            return;
          }

          // Still pending
          const timeElapsed = Math.floor((attempts * 2) / 60);
          setMessage(`Waiting for payment confirmation... (${timeElapsed}s)`);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        // Don't fail immediately - continue polling
      }
    };

    // Start checking after 3 seconds (allow STK push to be processed)
    setTimeout(() => {
      checkStatus();
      interval = setInterval(checkStatus, 2000); // Check every 2 seconds
    }, 3000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orderId, attempts, onComplete, onFailed]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center"
    >
      <div className="flex flex-col items-center gap-6">
        {status === "checking" && (
          <>
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-spin">
                <Loader2 className="w-full h-full text-yellow-500 animate-spin" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Processing M-Pesa Payment</h3>
              <p className="text-gray-400">{message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Please check your phone and enter your M-Pesa PIN when prompted
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Do not close this page</span>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-20 w-20 text-green-500" />
            <div>
              <h3 className="text-xl font-bold text-green-500 mb-2">Payment Successful!</h3>
              <p className="text-gray-400">
                Your payment has been confirmed. We'll start processing your order shortly.
              </p>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="h-20 w-20 text-red-500" />
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-2">Payment Failed</h3>
              <p className="text-gray-400">{message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}