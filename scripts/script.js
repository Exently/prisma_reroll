import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://qasclnestulhssmseebb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhc2NsbmVzdHVsaHNzbXNlZWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDg4MDUsImV4cCI6MjA2NTI4NDgwNX0.D9Y1MYT4QwlEKBtuCa3XCbybzcLxQYuT5RN8QX9t4h4');

// Character counter functionality
const nameInput = document.getElementById('name');
const charCount = document.getElementById('charCount');
const maxLength = 20;

function updateCharCount() {
    const currentLength = nameInput.value.length;
    charCount.textContent = `${currentLength}/${maxLength}`;
    
    if (currentLength >= maxLength) {
        charCount.classList.remove('text-gray-400');
        charCount.classList.add('text-red-400');
    } else if (currentLength >= maxLength - 5) {
        charCount.classList.remove('text-gray-400', 'text-red-400');
        charCount.classList.add('text-yellow-400');
    } else {
        charCount.classList.remove('text-yellow-400', 'text-red-400');
        charCount.classList.add('text-gray-400');
    }
}

nameInput.addEventListener('input', updateCharCount);
// Initialize counter
updateCharCount();

// Form submission
document.getElementById('player-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        player_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        class_now: document.getElementById('class_now').value,
        class_reroll: document.getElementById('class_reroll').value || null,
        main_spec: document.getElementById('main_spec').value,
        second_spec: document.getElementById('second_spec').value || null,
        comment: document.getElementById('comment').value || null
    };

    const { error } = await supabase.from('player').insert([formData]);

    const statusDiv = document.getElementById('status');
    if (error) {
        console.error(error);
        statusDiv.textContent = 'Fehler beim Speichern der Daten.';
        statusDiv.classList.add('text-red-500');
    } else {
        statusDiv.textContent = 'Daten erfolgreich gespeichert!';
        statusDiv.classList.add('text-green-500');
        document.getElementById('player-form').reset();
        updateCharCount(); // Reset character counter after form submission
    }
});
