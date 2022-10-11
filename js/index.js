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

    // Start by using the url if it is an image, otherwise use the lower-res thumbnail
    if (postInfo.url.match(/((.jpeg)|(.jpg))$/)) thumbnail.src = postInfo.url;
    else if (thumbURL.match(/((.jpeg)|(.jpg))$/)) thumbnail.src = thumbURL;

    // Create upvote ratio bar
    const ratio = document.createElement("div");
    ratio.className = "ratio";

    // Create a liked/disliked bar and set styling
    const liked = document.createElement("div");
    liked.className = "liked";
    liked.style.backgroundColor = "#f5a313";
    liked.style.borderRadius = "4px";
    liked.style.height = "100%";
    liked.style.width = `${postInfo.upvote_ratio * 100}%`;

    ratio.appendChild(liked);

    // Create a post Footer and add subreddit and ratio to it
    const postFooter = document.createElement("div");
    postFooter.className = "footer";
    postFooter.appendChild(ratio);
    postFooter.appendChild(subredditDiv);

    // Add to main div
    postDiv.appendChild(postTitle);
    // If there is a thumbnail attach it otherwise skip it
    if (thumbURL.match(/((.jpeg)|(.jpg))$/)) postDiv.appendChild(thumbnail);
    postDiv.appendChild(postFooter);
    mainDisplay.appendChild(postDiv);
  }
}

main();
