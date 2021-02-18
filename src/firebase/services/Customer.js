import { firestore } from "../Firebase";

const db = firestore.collection("customer");

// https://bezkoder.com/react-firestore-crud/
class Customer {
    getAll() {
        return db;
    }

    getOne(id) {
        return db.doc(id);
    }

    create(tutorial) {
        return db.add(tutorial);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}

export default new Customer();