import * as React from 'react';
import { Text, View, StyleSheet,FlatList,Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';


const Pessoa = ({userId,title,city,website}) => {

    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    
    <View>
    
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={city} mensagem2={website}/>
      
      <Pressable onPress={mudaModal}>
               
        <Text style={styles.paragraph}>{userId}</Text>
        <Text style={styles.paragraph}>{title}</Text>
      </Pressable>
    </View>
    )
}

const ShowDetalhes = ({display,toogleModal,mensagem,mensagem2}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                  <Text>{mensagem2}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

const DATA = [
        {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "city": "Wisokyburgh",
    "website": "hildegard.org",
    "completed": false
  },
  {
    "userId": 2,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
     "city": "McKenziehaven",
     "website": "anastasia.net",
    "completed": false
  },
  {
    "userId": 3,
    "id": 3,
    "title": "fugiat veniam minus",
    "city": "South Elvis",
    "website": "ramiro.info",
    "completed": false
  },
  {
    "userId": 4,
    "id": 4,
    "title": "et porro tempora",
    "city": "Roscoeview",
    "website": "kale.biz",
    "completed": true
  },
  {
    "userId": 5,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "city": "South Christy",
    "website": "demarco.info",
    "completed": false
  },
  {
    "userId": 6,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false,
    "website": "ola.org",
    "city": "Gwenborough"
  },
  {
    "userId": 7,
    "id": 7,
    "title": "illo expedita consequatur quia in",
     "city": "Howemouth",
     "website": "elvis.io",
    "completed": false
  },
  {
    "userId": 8,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "website": "conrad.com",
    "completed": true
  },
  {
    "userId": 9,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "website": "jacynthe.com",
    "city": "Aliyaview",
    "completed": false
  },
  {
    "userId": 10,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "city": "Bartholomebury",
    "website": "ambrose.net",
    "completed": true
  }
    ];

export default function App() {

//função que renderiza cada item do FlatList
  function meuItem({item}){    
    
    return(
      //criar a funcao Pessoa fora do App
      <Pessoa userId={item.userId} 
              title={item.title}
              city={item.city}
              website={item.website}
              completed={item.completed}
      />
    )
  }

  return (
    
    <View style={styles.container}>

      <FlatList
      //Data dados no formato json
        data={DATA}
        //criar a funcao meuItem em App
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
