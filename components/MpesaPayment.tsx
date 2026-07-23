// components/checkout/MpesaPayment.tsx
import { motion } from "framer-motion";
import { Phone, Info } from "lucide-react";

interface MpesaPaymentProps {
  phoneNumber: string;
  totalAmount: number;
  mpesaNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MpesaPayment({
  phoneNumber,
  totalAmount,
  mpesaNumber,
  onChange,
}: MpesaPaymentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-6 mb-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-500/10 rounded-lg">
          <Phone className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <h3 className="font-bold">M-Pesa Payment</h3>
          <p className="text-sm text-gray-400">
            You will receive a prompt on your phone to enter your PIN
          </p>
        </div>
      </div>

      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-500">
            Pay <span className="font-bold">KES {totalAmount.toFixed(2)}</span> via M-Pesa. 
            You'll receive a payment request on your phone.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          M-Pesa Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={phoneNumber}
          onChange={onChange}
          placeholder="0712345678"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the phone number registered with M-Pesa (e.g., 0712345678)
        </p>
      </div>

      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-300">Paybill Business Number:</span>{" "}
          {mpesaNumber}
        </p>
        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-300">Account Reference:</span>{" "}
          Your order number will be generated after submission
        </p>
      </div>
    </motion.div>
  );
}