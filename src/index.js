//Import Different Pages here
import { loadHomePage } from './pages/homePage.js';

//Function to clear the content of the main content div
function clearContent() {
  const content = document.getElementById("#content");
  if (content) {
    content.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //Start by clearing the content of the main content div
  clearContent();

  //Get Body - Change className of Body and Main Content div for the HomePage
  const body = document.querySelector("body");
  body.className = "bodyHomepage";
  content.className = "homepage";

  //Function Example: Load the Homepage on initial load
  loadHomePage();

  /* Button Example: Get (Header-)Button from the DOM and add an event listener to it, which loads the corresponding page 
      const homeButton = document.querySelector(".btn:nth-child(1)");
      homeButton.addEventListener("click", () => {
      clearContent();
      mainContent.className = "homepage";
      body.className = "bodyHomepage";
      loadHomepage();
 });
*/
});
