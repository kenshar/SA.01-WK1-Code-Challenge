document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsSection = document.getElementById('results');

    calculateBtn.addEventListener('click', calculateSalary);
    
    // Also allow Enter key
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateSalary();
        }
    });

    function calculateSalary() {
        // Get input values
        const basicSalary = parseFloat(document.getElementById('basicSalary').value);
        const benefits = parseFloat(document.getElementById('benefits').value) || 0;

        // Validate inputs
        if (isNaN(basicSalary) || basicSalary <= 0) {
            alert('Please enter a valid basic salary amount.');
            return;
        }

        // Calculate components
        const grossSalary = basicSalary + benefits;
        
        // NSSF Deduction (Tier I: 6% of first KSh 7,000, Tier II: 6% of next KSh 23,000)
        const nssfDeduction = calculateNSSF(basicSalary);
        
        // Taxable Income (Gross - NSSF)
        const taxableIncome = grossSalary - nssfDeduction;
        
        // PAYE (Tax) Calculation
        const paye = calculatePAYE(taxableIncome);
        
        // NHIF Deduction
        const nhifDeduction = calculateNHIF(grossSalary);
        
        // Net Salary
        const netSalary = grossSalary - nssfDeduction - paye - nhifDeduction;

        // Display results
        displayResults({
            basicSalary,
            benefits,
            grossSalary,
            nssfDeduction,
            taxableIncome,
            paye,
            nhifDeduction,
            netSalary
        });
    }

    function calculateNSSF(basicSalary) {
        // As of July 2024: New NSSF rates (6% of first KSh 7,000 + 6% of next KSh 23,000)
        const tier1 = Math.min(basicSalary, 7000) * 0.06;
        const tier2 = basicSalary > 7000 ? Math.min(basicSalary - 7000, 23000) * 0.06 : 0;
        return tier1 + tier2;
    }

    function calculatePAYE(taxableIncome) {
        // Personal Relief: KSh 2,400 per month
        const personalRelief = 2400;
        
        // PAYE tax brackets (as per KRA rates)
        let tax = 0;
        
        if (taxableIncome <= 24000) {
            tax = taxableIncome * 0.10;
        } else if (taxableIncome <= 32333) {
            tax = 24000 * 0.10 + (taxableIncome - 24000) * 0.25;
        } else {
            tax = 24000 * 0.10 + (32333 - 24000) * 0.25 + (taxableIncome - 32333) * 0.30;
        }
        
        // Apply personal relief
        tax = Math.max(0, tax - personalRelief);
        return tax;
    }

    function calculateNHIF(grossSalary) {
        // NHIF deduction rates based on gross salary
        if (grossSalary <= 5999) return 150;
        else if (grossSalary <= 7999) return 300;
        else if (grossSalary <= 11999) return 400;
        else if (grossSalary <= 14999) return 500;
        else if (grossSalary <= 19999) return 600;
        else if (grossSalary <= 24999) return 750;
        else if (grossSalary <= 29999) return 850;
        else if (grossSalary <= 34999) return 900;
        else if (grossSalary <= 39999) return 950;
        else if (grossSalary <= 44999) return 1000;
        else if (grossSalary <= 49999) return 1100;
        else if (grossSalary <= 59999) return 1200;
        else if (grossSalary <= 69999) return 1300;
        else if (grossSalary <= 79999) return 1400;
        else if (grossSalary <= 89999) return 1500;
        else if (grossSalary <= 99999) return 1600;
        else return 1700;
    }

    function displayResults(data) {
        const formatter = new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        });

        const resultsHTML = `
            <div class="salary-breakdown">
                <div class="salary-item">
                    <span class="salary-label">Basic Salary:</span>
                    <span class="salary-value">${formatter.format(data.basicSalary)}</span>
                </div>
                <div class="salary-item">
                    <span class="salary-label">Benefits:</span>
                    <span class="salary-value">${formatter.format(data.benefits)}</span>
                </div>
                <div class="salary-item">
                    <span class="salary-label">Gross Salary:</span>
                    <span class="salary-value">${formatter.format(data.grossSalary)}</span>
                </div>
                <div class="salary-item">
                    <span class="salary-label">Taxable Income:</span>
                    <span class="salary-value">${formatter.format(data.taxableIncome)}</span>
                </div>
            </div>

            <div class="deductions">
                <h3>Deductions</h3>
                <div class="salary-item">
                    <span class="salary-label">PAYE (Tax):</span>
                    <span class="salary-value">${formatter.format(data.paye)}</span>
                </div>
                <div class="salary-item">
                    <span class="salary-label">NSSF:</span>
                    <span class="salary-value">${formatter.format(data.nssfDeduction)}</span>
                </div>
                <div class="salary-item">
                    <span class="salary-label">NHIF:</span>
                    <span class="salary-value">${formatter.format(data.nhifDeduction)}</span>
                </div>
                <div class="salary-item" style="border-top: 2px solid #333; margin-top: 10px; padding-top: 10px;">
                    <span class="salary-label">Total Deductions:</span>
                    <span class="salary-value">${formatter.format(data.paye + data.nssfDeduction + data.nhifDeduction)}</span>
                </div>
            </div>

            <div class="net-salary">
                <div class="salary-label">NET SALARY (Take Home)</div>
                <div class="salary-value">${formatter.format(data.netSalary)}</div>
            </div>
        `;

        resultsSection.innerHTML = resultsHTML;
        resultsSection.classList.add('show');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
});