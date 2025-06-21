import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://qasclnestulhssmseebb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhc2NsbmVzdHVsaHNzbXNlZWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDg4MDUsImV4cCI6MjA2NTI4NDgwNX0.D9Y1MYT4QwlEKBtuCa3XCbybzcLxQYuT5RN8QX9t4h4');

const { data, error } = await supabase
  .from('player')
  .select('player_name, class_now, class_reroll, main_spec, second_spec');

if (error) {
  console.error(error);
  alert('Fehler beim Laden der Daten.');
} else {
  const tbody = document.querySelector('#players-table tbody');
  data.forEach(player => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-800/50 transition-colors';
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-gray-200">${player.player_name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-200">${player.class_now}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-300">${player.class_reroll || '-'}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-200">${player.main_spec}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-300">${player.second_spec || '-'}</td>
    `;
    tbody.appendChild(row);
  });
}
