async function scrape(url) {
  const reply = fetch(url).then((response) => response.json());
  if (!reply) throw Error("Unable to resolve URL");
  return reply;
}

async function main() {
  const redditData = (await scrape("https://www.reddit.com/.json")).data
    .children;

  const mainDisplay = document.getElementById("main_display");

  console.log(redditData[0].data);

  for (let i = 0; i < redditData.length; i++) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const subredditDiv = document.createElement("div");
    subredditDiv.className = "subreddit";
    subredditDiv.innerHTML = redditData[i].data.subreddit;

    // Use the image preview
    //const preview = document.createElement("img");
    // preview.src = redditData[i].data.preview?.images[0]?.source.url;
    // Sadly it seems getting the preview is 403 forbidden :'()
    // preview.alt = "Preview of this post";

    // Create a link to the original post
    const link = document.createElement("a");
    link.className = "post_link";
    link.textContent = "Take me to the post!";
    link.href = "https://www.reddit.com" + redditData[i].data.permalink;

    // Add to main div
    //postDiv.appendChild(preview);
    postDiv.appendChild(subredditDiv);
    postDiv.appendChild(link);
    mainDisplay.appendChild(postDiv);
  }
}

main();
