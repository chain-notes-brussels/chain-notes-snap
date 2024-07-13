// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.26;

/**
 * @title CNDDataTypes
 * @author ChainNotes Technical Team
 * @notice Library containing ChainNotes contracts' custom DataTypes
 *
 */
library CNDataTypes {
    /**
     * @notice
     *  Custom note datatype
     *
     * @param noteWriter address of author
     * @param sentiment if comment is POSITIVE or NEGATIVE
     * @param uri IPFS uri as a string
     *
     */
    struct Note {
        address noteWriter;
        Sentiment sentiment;
        string uri;
    }

    /**
     * @notice
     *  Custom datatype to keep track of the note score
     *
     * @param score score of specific note
     * @param consideredHelpful a bool if this note is considered helpful
     *
     */
    struct NoteScore {
        uint256 score;
        bool consideredHelpful;
    }

    /**
     * @notice
     *  Custom datatype to handle world id proof
     *
     * @param root The root of the Merkle tree (returned by the JS widget).
     * @param signal signal An arbitrary input from the user, usually the user's wallet address
     * @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget)
     * @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
     *
     */
    struct WorldIdProof {
        uint256 root;
        address signal;
        uint256 nullifierHash;
        uint256[8] proof;
    }

    /// @dev Rating enum, used to rate different notes
    enum Rating {
        HELPFUL,
        NOT_HELPFUL,
        SOMEWHAT_HELPFUL
    }

    /// @dev Sentiment enum, used to tag a note as either positive or negative in sentiment
    enum Sentiment {
        POSITIVE,
        NEGATIVE
    }

    enum Actions {
        WRITTEN_NOTE,
        VOTED
    }
}