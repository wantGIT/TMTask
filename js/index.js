async function scrape(url) {
  const reply = fetch(url).then((response) => response.json());
  if (!reply) throw Error("Unable to resolve URL");
  return reply;
}

async function main() {
  const redditData = (await scrape("https://www.reddit.com/.json")).data
    .children;

  const mainDisplay = document.getElementById("main_display");

  for (let i = 0; i < redditData.length; i++) {
    // The useful data
    const postInfo = redditData[i].data;

    // Create a container div which also links to the original
    const postDiv = document.createElement("a");
    postDiv.className = "post";
    postDiv.href = "https://www.reddit.com" + postInfo.permalink;

    // Get the subreddit name
    const subredditDiv = document.createElement("div");
    subredditDiv.className = "subreddit";
    // Add subreddit with some styling
    const subR = document.createElement("div");
    const subRname = document.createElement("div");
    subR.innerHTML = "r/";
    subRname.innerHTML = postInfo.subreddit;
    subR.className = "r";
    subredditDiv.appendChild(subR);
    subredditDiv.appendChild(subRname);

    // Get the post title
    const postTitle = document.createElement("div");
    postTitle.className = "post_title";
    postTitle.innerHTML = postInfo.title;

    // Use the thumbnail
    const thumbnail = document.createElement("img");
    const thumbURL = redditData[i].data.thumbnail;
    thumbnail.className = "thumbnail";
    thumbnail.alt = "Thumbnail";
    if (thumbURL.match(/((.jpeg)|(.jpg))$/)) thumbnail.src = thumbURL;

    // Add to main div
    postDiv.appendChild(postTitle);
    // If there is a thumbnail attach it otherwise skip it
    if (thumbURL.match(/((.jpeg)|(.jpg))$/)) postDiv.appendChild(thumbnail);
    postDiv.appendChild(subredditDiv);
    mainDisplay.appendChild(postDiv);
  }
}

main();
