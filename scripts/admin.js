import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://qasclnestulhssmseebb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhc2NsbmVzdHVsaHNzbXNlZWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDg4MDUsImV4cCI6MjA2NTI4NDgwNX0.D9Y1MYT4QwlEKBtuCa3XCbybzcLxQYuT5RN8QX9t4h4');


window.adminLogin = async function() {
    // jetzt ist sie global verfügbar für onclick im HTML
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
  
    const { error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) {
      document.getElementById('login-error').textContent = 'Login fehlgeschlagen!';
      console.error(error);
    } else {
      document.getElementById('login-form').style.display = 'none';
      loadEntries();
    }
  };

async function loadEntries() {
    const session = await supabase.auth.getSession();
    if (!session.data.session) return;

    const { data, error } = await supabase
        .from('player')
        .select('id, player_name, class_now, class_reroll, main_spec, second_spec, comment, created_at');
    
    if (error) {
        alert('Fehler beim Laden der Daten');
        return;
    }

    const tbody = document.querySelector('#admin-table tbody');
    document.getElementById('admin-section').style.display = 'block';
    tbody.innerHTML = '';

    data.forEach(entry => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-800/50 transition-colors';
        const truncatedName = entry.player_name.length > 20 
            ? entry.player_name.substring(0, 20) + '...' 
            : entry.player_name;
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-gray-200" title="${entry.player_name}">${truncatedName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-200">${entry.class_now}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-300">${entry.class_reroll || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-200">${entry.main_spec}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-300">${entry.second_spec || '-'}</td>
            <td class="px-6 py-4 break-words text-gray-300">${entry.comment || '-'}</td>
            <td class="px-6 py-4">
                <button onclick="deleteEntry(${entry.id})" 
                        class="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/10">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteEntry = async function(id) {
    const confirmDelete = confirm("Eintrag wirklich löschen?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('player').delete().eq('id', id);
    if (error) {
        alert('Löschen fehlgeschlagen!');
        console.error(error);
    } else {
        loadEntries(); // neu laden
    }
}

// Automatisch Session prüfen
supabase.auth.getSession().then(session => {
    if (session.data.session) {
        document.getElementById('login-form').style.display = 'none';
        loadEntries();
    }
});
