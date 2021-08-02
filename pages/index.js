import Layout from '../components/layout/Layout'
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
// const DUMMY_CONTENT = [
//   {
//     id: 'm1',
//     title: 'A first meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Portofino_-_2016-06-02_-_Harbor.jpg/640px-Portofino_-_2016-06-02_-_Harbor.jpg',
//     address: 'Some address 5, some city',
//     description:'This is a first meetup'
//   },
//   {
//     id: 'm2',
//     title: 'A second meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Courtyard_of_the_Doge%27s_Palace_%28Venice%29_002.jpg/640px-Courtyard_of_the_Doge%27s_Palace_%28Venice%29_002.jpg',
//     address: 'Some address 10, some city',
//     description:'This is a second meetup'
//   },

// ]

const HomePage = (props) => {
  
  return (
    <>
      <Head>
      <title>React Meetups Page</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
    
  )
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://chirag_aspire:chirag.aspire@cluster0.zoh4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const db = client.db();

const meetupsCollection = db.collection('meetups');
        
const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id:meetup._id.toString()
          
      }))
    },revalidate: 1,
  }
}

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups:DUMMY_CONTENT
//     }
//   }
// }

export default HomePage;