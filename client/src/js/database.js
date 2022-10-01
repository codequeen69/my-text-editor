import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateText', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate_db', 1);

  const tx = jateDb.transaction('jateText', 'readonly');

  const store = tx.objectStore('jateText');

  const request = store.getAll();

  const result = await request;

  console.log('result.value', result);
  return result;


}

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
const jateDb = await openDB('jate_db', 1);

const tx = jateDb.transaction('jateText', 'readwrite');

const store = tx.objectStore('jateText');

const request = store.put({id: id, content: content});

const result = await request;

console.log('🚀 - data saved to the database', result);

} 

initdb();
