async function scrape(url) {
  const reply = fetch(url).then((response) => response.json());
  if (!reply) throw Error("Unable to resolve URL");
  return reply;
}

async function main() {
  const redditData = (await scrape("https://www.reddit.com/.json")).data
    .children;

  const mainDisplay = document.getElementById("main_display");

  console.log(redditData);

  for (let i = 0; i < redditData.length; i++) {
    // The useful data
    const postInfo = redditData[i].data;
    // Create a container div
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    // Get the subreddit name
    const subredditDiv = document.createElement("div");
    subredditDiv.className = "subreddit";
    subredditDiv.innerHTML = postInfo.subreddit;

    // Get the post title
    const postTitle = document.createElement("div");
    postTitle.className = "post_title";
    postTitle.innerHTML = postInfo.title;

    // Use the thumbnail
    const thumbnail = document.createElement("img");
    thumbnail.src = redditData[i].data.thumbnail;
    thumbnail.className = "thumbnail";
    thumbnail.alt = "Thumbnail";

    // Create a link to the original post
    const link = document.createElement("a");
    link.className = "post_link";
    link.textContent = "Take me to the post!";
    link.href = "https://www.reddit.com" + postInfo.permalink;

    // Add to main div
    postDiv.appendChild(postTitle);
    postDiv.appendChild(thumbnail);
    postDiv.appendChild(subredditDiv);
    postDiv.appendChild(link);
    mainDisplay.appendChild(postDiv);
  }
}

main();
