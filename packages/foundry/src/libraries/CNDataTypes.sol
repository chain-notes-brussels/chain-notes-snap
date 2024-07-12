// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

library CNDataTypes {
    struct Note {
        address noteWriter;
        mapping(Rating rating => uint32 amount) amountOfRating;
        mapping(Sentiment sentiment => uint32 amount) amountOfSentiment;
        uint16 score;
        string uri;
        string pictureUri;
    }

    struct User {
        uint40 amountOfVotes;
        mapping(Rating rating => uint40) amountOf;
    }

    enum Rating {
        HELPFUL,
        NOT_HELPFUL,
        SOMEWHAT_HELPFUL
    }

    enum Sentiment {
        POSITIVE,
        NEGATIVE
    }
}