// mongodb+srv://chirag_aspire:<password>@cluster0.zoh4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
import Head from 'next/head';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  
    
        if (req.method === 'POST') {
            const data = req.body;
            const client = await MongoClient.connect(
              'mongodb+srv://chirag_aspire:chirag.aspire@cluster0.zoh4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
          if (client) {
            console.log("connected!!!");
            }
          const db = client.db();
          
            
            
        
            const meetupsCollection = db.collection('meetups');
        
            const result = await meetupsCollection.insertOne(data);
        
            console.log(result);
        
            
            client.close();

            res.status(201).json({ message: 'Meetup inserted!' });
          }
    }


export default handler;