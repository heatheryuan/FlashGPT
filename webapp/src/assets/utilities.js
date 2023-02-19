// import {writeJsonFile} from 'write-json-file';

// export default function createSet(data) {
//     const handleError = (error) => {
//         if(error) {
//             console.log(error);
//             return;
//         }
//     }
    
//     const jsonStr = JSON.stringify(data, null, 2);
//     // writeJsonFile('../data/sets.json', jsonStr);
// }

import firebase from "../firebase/firebase";

// const refSets = firebase.firestore().collection("sets");

// const getSets = () => {
//     const items = [];
//     refSets.onSnapshot((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             items.push(doc.data());
//         })
//     })
//     console.log(items);
//     return items;
// }

// export default getSets;