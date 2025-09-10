document.addEventListener('DOMContentLoaded', function() {
    const marksInput = document.getElementById('marksInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const output = document.getElementById('output');
    
    calculateBtn.addEventListener('click', calculateGrade);
    marksInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateGrade();
        }
    });
    
    function calculateGrade() {
        const marks = parseFloat(marksInput.value);
        
        if (isNaN(marks) || marks < 0 || marks > 100) {
            output.textContent = 'Please enter a valid mark between 0 and 100';
            output.className = '';
            return;
        }
        
        let grade;
        let gradeClass;
        
        if (marks > 79) {
            grade = 'A';
            gradeClass = 'grade-A';
        } else if (marks >= 60) {
            grade = 'B';
            gradeClass = 'grade-B';
        } else if (marks >= 50) {
            grade = 'C';
            gradeClass = 'grade-C';
        } else if (marks >= 40) {
            grade = 'D';
            gradeClass = 'grade-D';
        } else {
            grade = 'E';
            gradeClass = 'grade-E';
        }
        
        output.textContent = `Grade: ${grade}`;
        output.className = gradeClass;
    }
});