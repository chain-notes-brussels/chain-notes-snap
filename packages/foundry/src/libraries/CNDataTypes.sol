// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

library CNDataTypes {
    struct Note {
        address noteWriter;
        Sentiment sentiment;
        uint16 score;
        string uri;
    }

    struct NoteScore {
        uint256 score;
        bool consideredHelpful;
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