import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://qasclnestulhssmseebb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhc2NsbmVzdHVsaHNzbXNlZWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDg4MDUsImV4cCI6MjA2NTI4NDgwNX0.D9Y1MYT4QwlEKBtuCa3XCbybzcLxQYuT5RN8QX9t4h4');

document.getElementById('player-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim().toLowerCase();

  const { data: existing } = await supabase
    .from('player')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    document.getElementById('status').innerText = 'Diese E-Mail wurde bereits verwendet.';
    return;
  }

  const { error } = await supabase.from('player').insert([{
    email,
    player_name: form.name.value,
    class_now: form.class_now.value,
    class_reroll: form.class_reroll.value,
    main_spec: form.main_spec.value,
    second_spec: form.second_spec.value,
    comment: form.comment.value
  }]);

  if (error) {
    document.getElementById('status').innerText = 'Fehler beim Eintragen.';
    console.error(error);
  } else {
    document.getElementById('status').innerText = 'Erfolgreich eingetragen!';
    form.reset();
  }
});
