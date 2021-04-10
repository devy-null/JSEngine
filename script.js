let panel = document.getElementById('output');

function output(text)
{
  panel.textContent = text;
}

function proccessEvent(event)
{
  output(JSON.stringify(event));
}

function events(arr)
{
  arr.forEach(proccessEvent);
}

let errorcount = 0; 

function fetchRemote()
{
  var script = document.createElement('script');
  document.body.appendChild(script);

  script.addEventListener('load', function() {
    document.body.removeChild(script);

    panel.textContent += 'ok'; 
    errorcount = 0;

    fetchRemote();
  });

  script.addEventListener('error', function() {
    document.body.removeChild(script);
    
    panel.textContent += 'er'; 
    
    if (++errorcount > 5)
    {
      setTimeout(fetchRemote, 5000);
    }
    else
    {
      fetchRemote();
    }
  });

  script.src = 'events.js?cb=' + Date.now();
}
function act()
{
  fetch('action', { 'method': 'POST', body: '{ \"n\": \"3x\", \"a\": [] }' }).then(r => r.text()).then(j => output(j));
}

function hello()
{
  fetch('action', { 'method': 'POST', body: '{ \"n\": \"71\", \"a\": [\"Hellow worldz\"] }' });
}

fetchRemote();
