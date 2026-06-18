import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { DollarSign, Percent, Calendar } from 'lucide-react';

interface LoanCalculatorProps {
  vehiclePrice?: number;
}

export default function LoanCalculator({ vehiclePrice = 120000 }: LoanCalculatorProps) {
  const [price, setPrice] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.2));
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalInterest = monthlyPayment * numberOfPayments - loanAmount;
  const totalCost = price + totalInterest;

  const downPaymentPercent = Math.round((downPayment / price) * 100);

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">RV Loan Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Estimate your monthly payment and financing costs
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Vehicle Price</Label>
            <div className="flex items-center gap-2 mt-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">
              Down Payment: ${downPayment.toLocaleString()} ({downPaymentPercent}%)
            </Label>
            <Slider
              min={0}
              max={price}
              step={5000}
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">
              Interest Rate: {interestRate.toFixed(2)}%
            </Label>
            <Slider
              min={3}
              max={12}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Current RV rates: 6.24% - 7.99%
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">
              Loan Term: {loanTerm} years
            </Label>
            <Slider
              min={5}
              max={20}
              step={1}
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
              className="mt-2"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Loan Amount:</span>
            <span className="font-semibold">${loanAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center bg-white p-3 rounded-lg border-2 border-blue-200">
            <span className="text-sm font-medium">Monthly Payment:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-3 rounded">
              <div className="text-muted-foreground">Total Interest</div>
              <div className="font-semibold text-lg">
                ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-muted-foreground">Total Cost</div>
              <div className="font-semibold text-lg">
                ${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Get Pre-Approved
        </Button>
      </div>
    </Card>
  );
}
