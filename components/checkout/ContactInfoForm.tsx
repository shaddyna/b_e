// // components/checkout/ContactInfoForm.tsx

// interface ContactInfoFormProps {
//   email: string;
//   phone: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export function ContactInfoForm({ email, phone, onChange }: ContactInfoFormProps) {
//   return (
//     <div className="space-y-4 mb-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Email Address <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={onChange}
//           required
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
//           placeholder="you@example.com"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Phone Number <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="tel"
//           name="phone"
//           value={phone}
//           onChange={onChange}
//           required
//           className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
//           placeholder="e.g., 0712345678"
//         />
//       </div>
//     </div>
//   );
// }

// Update ContactInfoForm.tsx to include fullName
// components/checkout/ContactInfoForm.tsx
import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";

interface ContactInfoFormProps {
  email: string;
  phone: string;
  fullName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ContactInfoForm({
  email,
  phone,
  fullName,
  onChange,
}: ContactInfoFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Contact Information</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              name="fullName"
              value={fullName || ""}
              onChange={onChange}
              placeholder="John Doe"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="0712345678"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            For M-Pesa payments, this should be your registered M-Pesa number
          </p>
        </div>
      </div>
    </motion.div>
  );
}