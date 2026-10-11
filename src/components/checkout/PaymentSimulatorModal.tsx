'use client';

import React from 'react';
import { ShieldCheck, AlertCircle, X, Check, XCircle } from 'lucide-react';

interface PaymentSimulatorModalProps {
  isOpen: boolean;
  amount: number;
  modeTitle: string;
  onSuccess: (txnId: string) => void;
  onFailure: (reason: string) => void;
  onCancel: () => void;
}

export default function PaymentSimulatorModal({
  isOpen,
  amount,
  modeTitle,
  onSuccess,
  onFailure,
  onCancel
}: PaymentSimulatorModalProps) {
  if (!isOpen) return null;

  const handleSimulateSuccess = () => {
    const txnId = `pay_sim_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    onSuccess(txnId);
  };

  const handleSimulateFailure = () => {
    onFailure('Bank authorization rejected: UPI / Card transaction was declined by issuing bank (Test Scenario).');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sim-title"
      className="fixed inset-0 z-50 bg-[#252522]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-md bg-[#F3EFE6] text-[#252522] border border-[#A58B5F]/40 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#3C2921] text-[#F3EFE6] px-6 py-4 border-b border-[#A58B5F]/40 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A58B5F] block">
              RAZORPAY TEST GATEWAY · SIMULATOR
            </span>
            <h3 id="sim-title" className="font-serif text-lg font-normal text-[#F3EFE6]">
              {modeTitle}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-[#E2D9C8]/70 hover:text-[#F3EFE6] transition-colors"
            aria-label="Cancel transaction"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-1 bg-[#E2D9C8]/50 p-4 border border-[#CCC5B9]">
            <span className="text-xs font-mono uppercase text-[#252522]/60 block">Payable Authorization Amount</span>
            <div className="font-serif text-3xl text-[#51292D] font-medium">
              ₹{amount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] font-mono text-[#34483D] flex items-center justify-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Simulated 256-bit Secure Handshake
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans text-[#252522]/80 leading-relaxed">
            <p className="font-medium text-[#252522]">
              Store is currently in Owner Demonstration Mode. Choose an outcome to verify full store workflows without real charges:
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSimulateSuccess}
              className="w-full py-3 px-4 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#34483D]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Check className="w-4 h-4 text-[#A58B5F]" />
              <span>1. Simulate Successful Payment (200 OK)</span>
            </button>

            <button
              onClick={handleSimulateFailure}
              className="w-full py-3 px-4 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#51292D]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <XCircle className="w-4 h-4 text-[#E2D9C8]" />
              <span>2. Simulate Bank / Card Decline</span>
            </button>

            <button
              onClick={onCancel}
              className="w-full py-2.5 px-4 bg-transparent border border-[#CCC5B9] text-[#252522] text-xs font-mono uppercase tracking-wider hover:bg-[#E2D9C8] transition-all flex items-center justify-center gap-2"
            >
              <span>3. Simulate User Cancelled Transaction</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#CCC5B9]/60 text-center">
            <p className="text-[11px] font-mono text-[#252522]/50">
              When live RAZORPAY_KEY_ID is provided in production, standard Razorpay Checkout modal replaces this simulator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
