import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const price = Number(body.price) || 166000000;
    const dpPercent = Number(body.dp_percent) || 5;
    const tenorYears = Number(body.tenor_years) || 20;
    const kprType = body.kpr_type || 'subsidi'; // 'subsidi' | 'komersial' | 'syariah'

    const annualRate = kprType === 'subsidi' ? 5.0 : kprType === 'syariah' ? 7.25 : 6.75;
    const dpAmount = Math.round((price * dpPercent) / 100);
    const loanAmount = Math.max(0, price - dpAmount);

    const calcInstallment = (principal: number, rate: number, years: number) => {
      if (principal <= 0) return 0;
      const totalMonths = years * 12;
      const monthlyRate = rate / 100 / 12;
      if (monthlyRate === 0) return Math.round(principal / totalMonths);
      const installment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      return Math.round(installment);
    };

    const monthlyInstallment = calcInstallment(loanAmount, annualRate, tenorYears);
    const minSalary = Math.round(monthlyInstallment / 0.35); // DBR 35%

    const tenorComparison = [10, 15, 20, 25].map(t => ({
      tenor_years: t,
      monthly_installment: calcInstallment(loanAmount, annualRate, t)
    }));

    // Estimated closing fees
    const bphtb = kprType === 'subsidi' ? 0 : Math.round(Math.max(0, price - 60000000) * 0.05);
    const ajbNotaris = kprType === 'subsidi' ? 2500000 : Math.round(price * 0.015);
    const bbn = kprType === 'subsidi' ? 1500000 : Math.round(price * 0.01);
    const provisiBank = kprType === 'subsidi' ? 500000 : Math.round(loanAmount * 0.01);
    const administrasiBank = kprType === 'subsidi' ? 350000 : 750000;
    const totalClosingFees = bphtb + ajbNotaris + bbn + provisiBank + administrasiBank;

    return NextResponse.json({
      success: true,
      simulation: {
        property_price: price,
        kpr_type: kprType,
        annual_interest_rate: annualRate,
        dp_percentage: dpPercent,
        dp_amount: dpAmount,
        loan_amount: loanAmount,
        tenor_years: tenorYears,
        monthly_installment: monthlyInstallment,
        min_salary_required: minSalary,
        tenor_comparison: tenorComparison,
        closing_fees_breakdown: {
          bphtb,
          ajb_notaris: ajbNotaris,
          bea_balik_nama: bbn,
          provisi_bank: provisiBank,
          administrasi_bank: administrasiBank,
          total_closing_fees: totalClosingFees
        },
        total_initial_cashflow: dpAmount + totalClosingFees
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: 'Invalid request parameters',
      details: err?.message || 'Unknown error'
    }, { status: 400 });
  }
}