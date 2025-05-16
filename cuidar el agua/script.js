function calculateSavings() {
    // Get input values
    const brushTimes = parseInt(document.getElementById('brush').value) || 0;
    const dishesTimes = parseInt(document.getElementById('dishes').value) || 0;
    const showerMinutes = parseInt(document.getElementById('shower').value) || 0;

    // Savings assumptions (liters per action)
    const brushSavingsPerTime = 6; // Closing tap while brushing (2 min at 3 L/min)
    const dishesSavingsPerTime = 10; // Closing tap while washing dishes (assuming 1 min saving)
    const showerSavingsPerMinute = 5; // Low-flow showerhead (10 L/min to 5 L/min)

    // Calculate total savings
    const totalSavings = (brushTimes * brushSavingsPerTime) +
                         (dishesTimes * dishesSavingsPerTime) +
                         (showerMinutes * showerSavingsPerMinute);

    // Display result
    const resultElement = document.getElementById('result');
    const savingsElement = document.getElementById('savings');
    savingsElement.textContent = totalSavings.toFixed(1);
    resultElement.style.display = 'block';
}