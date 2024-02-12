
fetch('https://dog.ceo/api/breeds/list/all')  
.then(response => {
  return response.json();
})
.then(data => {
  console.log(data);
  // Handle the retrieved data here
})
.catch(error => {
  console.error('There was a problem with your fetch operation:', error);
});