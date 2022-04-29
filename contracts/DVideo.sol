// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract DVideo {
    uint256 public videoCount = 0;
    string public name = "DVideo";

    // video struct
    struct Video {
        uint256 id;
        string hash;
        string title;
        address author;
    }
    mapping(uint256 => Video) public videos;
    event VideoUploaded(uint256 id, string hash, string title, address author);

    /*
    * functions
    */

    
    function uploadVideo(string memory _videoHash, string memory _title)
        public
    {
        // validation
        require(bytes(_videoHash).length > 0, "Video Hash cannot be empty.");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(msg.sender != address(0));

        // save video.
        videoCount++;
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

        // event
        emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
    }

    function listVideos() public {}
}
