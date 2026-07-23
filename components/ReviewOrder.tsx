// components/checkout/ReviewOrder.tsx
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ReviewOrderProps {
  formData: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    email: string;
    phone: string;
    fullName?: string;
  };
  paymentMethod: "mpesa" | "card" | "cash";
  totalAmount: number;
  error: string;
  processing: boolean;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ReviewOrder({
  formData,
  paymentMethod,
  totalAmount,
  error,
  processing,
  onBack,
  onSubmit,
}: ReviewOrderProps) {
  const getPaymentMethodLabel = () => {
    switch (paymentMethod) {
      case "mpesa":
        return "M-Pesa (STK Push)";
      case "card":
        return "Credit/Debit Card";
      case "cash":
        return "Cash on Delivery";
      default:
        return paymentMethod;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
    >
      <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

      <div className="space-y-4">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-gray-400 mb-2">Shipping Address</h3>
          <p className="text-white">
            {formData.fullName && `${formData.fullName}, `}
            {formData.street}, {formData.city}, {formData.state} {formData.zipCode}, {formData.country}
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-gray-400 mb-2">Contact Information</h3>
          <p className="text-white">Email: {formData.email}</p>
          <p className="text-white">Phone: {formData.phone}</p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-gray-400 mb-2">Payment Method</h3>
          <p className="text-white">{getPaymentMethodLabel()}</p>
          {paymentMethod === "mpesa" && (
            <p className="text-sm text-yellow-500 mt-1">
              You'll receive an M-Pesa prompt on your phone
            </p>
          )}
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Amount</span>
            <span className="text-2xl font-bold text-yellow-500">
              KES {totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={processing}
          className="flex-1 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:border-yellow-500 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={processing}
          className="flex-1 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              {paymentMethod === "mpesa" ? "Pay with M-Pesa" : "Place Order"}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}