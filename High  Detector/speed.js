document.addEventListener('DOMContentLoaded', function() {
    const speedInput = document.getElementById('speedInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const output = document.getElementById('output');
    const progressBar = document.getElementById('progressBar');
    
    calculateBtn.addEventListener('click', calculateDemeritPoints);
    speedInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateDemeritPoints();
        }
    });
    // Calculate demerit points based on speed
    function calculateDemeritPoints() {
        const speed = parseFloat(speedInput.value);
        
        if (isNaN(speed) || speed < 0) {
            output.textContent = 'Please enter a valid speed';
            output.className = '';
            progressBar.style.width = '0%';
            return;
        }
        // Reset output and progress bar
        if (speed < 70) {
            output.textContent = 'Ok';
            output.className = 'points-ok';
            progressBar.style.width = '0%';
        } else {
            const points = Math.floor((speed - 70) / 5);
            
            if (points > 12) {
                output.innerHTML = '<span class="license-suspended">License suspended</span>';
                progressBar.style.width = '100%';
            } else {
                output.textContent = `Points: ${points}`;
                
                // Update progress bar
                const progressPercentage = (points / 12) * 100;
                progressBar.style.width = `${progressPercentage}%`;
                
                // Add color class based on points
                if (points <= 4) {
                    output.className = 'points-ok';
                } else if (points <= 8) {
                    output.className = 'points-warning';
                } else {
                    output.className = 'points-danger';
                }
            }
        }
    }
});