import MongoDb from 'mongodb';
import { getCultures } from '../db/database.js';
import * as UserRepository from './auth.js';

const ObjectID = MongoDb.ObjectId;

export async function getAll() {
    return getCultures()
        .find()
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapCultures);
};

export async function getAllByUsername(user_name) {
    return getCultures()
    .find({user_name})
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapCultures);
}

//수정 id -> ?
export async function getById(id) {
    return getCultures()
    .find({_id: new ObjectID(id)})
    .next()
    .then(mapOptionalCulture);
}

// crud
// 수정 userId, text
export async function create(text, userId) {
    return UserRepository.findById(userId)
        .then((user) => getTweets().insertOne({
            text,
            createAt: new Date(),
            userId,
            name : user.name,
            username: user.username,
            url: user.url
        }))
        .then((res) => console.log(res))
        .then(mapOptionalTweet);
}

// 수정 userId, text
export async function update(id, text) {
    return getTweets().findOneAndUpdate(
        {_id: new ObjectID(id) },
        { $set: { text }},
        { returnOriginal: false }
    )
    .then((res) => res.value)
    .then(mapOptionalTweet);
}

// 수정 id
export async function remove(id) {
    return getTweets().deleteOne({ _id: new ObjectID(id)});
}

// add
function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweet) {
    return tweet.map(mapOptionalTweet);
}