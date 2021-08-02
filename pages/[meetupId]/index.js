import { MongoClient,ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';
const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetups.title}</title>
                <meta name='description' content={props.meetups.description} />
            </Head>
            <MeetupDetail
                id={props.meetups.id}
                image={props.meetups.image}
                title={props.meetups.title}
                address={props.meetups.address}
                description={props.meetups.description}
            />
        </>
        
    )
}

export const getStaticPaths = async() => {
    const client = await MongoClient.connect(
        'mongodb+srv://chirag_aspire:chirag.aspire@cluster0.zoh4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    if (client) {
      console.log("connected!!!");
      }
    const db = client.db();
    
    const meetupsCollection = db.collection('meetups');
            
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback: false,
        paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}})),
        
    }
}

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(
        'mongodb+srv://chirag_aspire:chirag.aspire@cluster0.zoh4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
      );
      const db = client.db();
    
      const meetupsCollection = db.collection('meetups');
    
      const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
      });
    
      client.close();
    return {
        props: {
            meetups: {
                
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    };
  }

export default MeetupDetails;