function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthMessage = document.getElementById('strength-message');
    const strengthMeterFill = document.getElementById('strength-meter-fill');
    const strengthPercentage = document.getElementById('strength-percentage');
    const passwordHint = document.getElementById('password-hint');
    const breakTime = document.getElementById('break-time');

    let strength = 0;

    if (password.length >= 8) {
        strength += 1;
    }
    if (/[A-Z]/.test(password)) {
        strength += 1;
    }
    if (/[0-9]/.test(password)) {
        strength += 1;
    }
    if (/[@$!%*?&]/.test(password)) {
        strength += 1;
    }

    let strengthText;
    let strengthClass;
    let strengthWidth;
    let hint;
    let breakTimeText;

    // Rough estimation based on common assumptions (e.g., 100 billion guesses per second)
    const secondsToBreak = calculateBreakTime(password);

    switch (strength) {
        case 0:
            strengthText = "";
            strengthClass = "";
            strengthWidth = "0";
            hint = "";
            breakTimeText = "";
            break;
        case 1:
            strengthText = "Weak";
            strengthClass = "strength-weak";
            strengthWidth = "25%";
            hint = "Try adding more characters, uppercase letters, numbers, or special symbols.";
            breakTimeText = `It could be broken in ${formatTime(secondsToBreak)}`;
            break;
        case 2:
            strengthText = "Medium";
            strengthClass = "strength-medium";
            strengthWidth = "50%";
            hint = "Try adding more characters, uppercase letters, numbers, or special symbols.";
            breakTimeText = `It could be broken in ${formatTime(secondsToBreak)}`;
            break;
        case 3:
            strengthText = "Strong";
            strengthClass = "strength-strong";
            strengthWidth = "75%";
            hint = "Your password is strong, but you can still make it stronger.";
            breakTimeText = `It could be broken in ${formatTime(secondsToBreak)}`;
            break;
        case 4:
            strengthText = "Very Strong";
            strengthClass = "strength-strong";
            strengthWidth = "100%";
            hint = "Your password is very strong.";
            breakTimeText = `It could be broken in ${formatTime(secondsToBreak)}`;
            break;
    }

    strengthMessage.textContent = strengthText;
    strengthMeterFill.className = 'strength-meter-fill ' + strengthClass;
    strengthMeterFill.style.width = strengthWidth;
    strengthPercentage.textContent = `Strength: ${strength * 25}%`;
    passwordHint.textContent = hint;
    breakTime.textContent = breakTimeText;
}

function calculateBreakTime(password) {
    const charsetSize = getCharsetSize(password);
    const guessesPerSecond = 100000000000; // 100 billion guesses per second
    const combinations = Math.pow(charsetSize, password.length);
    return combinations / guessesPerSecond;
}

function getCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/[0-9]/.test(password)) size += 10;
    if (/[@$!%*?&]/.test(password)) size += 10; // Basic special characters
    return size;
}

function formatTime(seconds) {
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    if (years >= 1) {
        return `${years.toFixed(2)} years`;
    } else if (days >= 1) {
        return `${days.toFixed(2)} days`;
    } else if (hours >= 1) {
        return `${hours.toFixed(2)} hours`;
    } else if (minutes >= 1) {
        return `${minutes.toFixed(2)} minutes`;
    } else {
        return `${seconds.toFixed(2)} seconds`;
    }
}
