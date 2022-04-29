const DVideo = artifacts.require("./DVideo.sol");

require("../client/node_modules/chai")
  .use(require("../client/node_modules/chai-as-promised"))
  .should();

contract("DVideo", ([deployer, author]) => {
  let dvideo;

  before(async () => {
    dvideo = await DVideo.deployed();
  });

  describe("Deployment", async () => {
    // validate app name
    it("...Name is DVideo", async () => {
      const name = await dvideo.name();
      assert.equal(name, "DVideo", "The name is not 'DVideo'.");
    });
  });

  describe("Video", async () => {
    let result, videoCount;
    const hash = "QmegBLhPUv48DYu6cWXvT7V91dhsUau6qt75AXGzhSiB2b";

    before(async () => {
      result = await dvideo.uploadVideo(hash, "Video Title", { from: author });
      videoCount = await dvideo.videoCount();
    });

    // check event
    it("...Creates video", async () => {
      assert.equal(videoCount, 1);

      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), videoCount.toNumber(), "Id is correct");
      assert.equal(event.hash, hash, "Hash is correct");
      assert.equal(event.title, "Video Title", "Title is correct");
      assert.equal(event.author, author, "Author is correct");
        
      // video must have hash
      await dvideo.uploadVideo("", "Video Title", { from: author }).should.be.rejected;
      // video must have title
      await dvideo.uploadVideo(hash, "", { from: author }).should.be.rejected;
    });

    it("...Lists Video", async () => {
        const video = await dvideo.videos(videoCount);
        assert.equal(video.id.toNumber(), videoCount.toNumber(), "Id is correct");
        assert.equal(video.hash, hash, "Hash is correct");
        assert.equal(video.title, "Video Title", "Title is correct");
        assert.equal(video.author, author, "Author is correct");
    });
  });
});
