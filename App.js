import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const planetas = {
  "Mercúrio": { imagem: require('./assets/mercurio.png'), descricao: "Mercúrio é o menor e mais interno planeta do Sistema Solar. Ele tem um diâmetro de 4.880 km e uma gravidade de 3.7 m/s². Sua temperatura varia drasticamente entre -180°C e 430°C." },
  "Vênus": { imagem: require('./assets/venus.png'), descricao: "Vênus é semelhante à Terra em tamanho, com um diâmetro de 12.104 km. Possui uma atmosfera densa de dióxido de carbono e uma gravidade de 8.87 m/s². Sua temperatura média é de 467°C." },
  "Terra": { imagem: require('./assets/terra.png'), descricao: "A Terra é o único planeta conhecido por abrigar vida. Tem um diâmetro de 12.742 km e uma gravidade de 9.81 m/s². Sua atmosfera é composta principalmente por nitrogênio e oxigênio." },
  "Marte": { imagem: require('./assets/marte.png'), descricao: "Marte é conhecido como o 'planeta vermelho' devido ao óxido de ferro em sua superfície. Tem um diâmetro de 6.779 km e uma gravidade de 3.71 m/s². Possui calotas polares de gelo." },
  "Júpiter": { imagem: require('./assets/jupiter.png'), descricao: "Júpiter é o maior planeta do Sistema Solar, com um diâmetro de 139.820 km. Possui uma gravidade de 24.79 m/s² e é composto principalmente de hidrogênio e hélio." },
  "Saturno": { imagem: require('./assets/saturno.png'), descricao: "Saturno é famoso por seus anéis compostos de gelo e poeira. Tem um diâmetro de 116.460 km e uma gravidade de 10.44 m/s². Sua atmosfera é rica em hidrogênio e hélio." },
  "Urano": { imagem: require('./assets/urano.png'), descricao: "Urano é um gigante gasoso gelado com um diâmetro de 50.724 km e uma gravidade de 8.69 m/s². Ele gira de lado, com um eixo de rotação inclinado em 98 graus." },
  "Netuno": { imagem: require('./assets/netuno.png'), descricao: "Netuno é o planeta mais distante do Sol, com um diâmetro de 49.244 km e uma gravidade de 11.15 m/s². Ele possui os ventos mais rápidos do Sistema Solar, atingindo até 2.100 km/h." },
  "Sol": { imagem: require('./assets/sol.png'), descricao: "O Sol é a estrela central do nosso Sistema Solar. Com um diâmetro de 1.392.700 km e uma temperatura superficial de cerca de 5.500°C, ele fornece luz e calor para todos os planetas.  " }
};

const PlanetasApp = () => {
  const [pesquisa, setPesquisa] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const [modoNoturno, setModoNoturno] = useState(false);
  const [tamanhoImagem, setTamanhoImagem] = useState(100);

  const planetasFiltrados = Object.keys(planetas).filter(nome => nome.toLowerCase().startsWith(pesquisa.toLowerCase()));

  return (
    <View style={[styles.container, modoNoturno && styles.modoNoturno]}>
      <Text style={[styles.titulo, modoNoturno && styles.textoNoturno]}>Sistema Solar</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Digite o nome do planeta" 
        value={pesquisa} 
        onChangeText={setPesquisa} 
      />
      
      {planetasFiltrados.length > 0 && (
        <FlatList
          data={planetasFiltrados}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { setSelecionado(item); setPesquisa(item); }}>
              <Text style={[styles.resultado, modoNoturno && styles.textoNoturno]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      
      {selecionado ? (
        <ScrollView>
          <Text style={[styles.titulo, modoNoturno && styles.textoNoturno]}>{selecionado}</Text>
          <Image source={planetas[selecionado].imagem} style={{ width: tamanhoImagem, height: tamanhoImagem, alignSelf: 'center' }} />
          <Text style={[styles.descricao, modoNoturno && styles.textoNoturno]}>{planetas[selecionado].descricao}</Text>
          
          <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Ajustar tamanho da imagem:</Text>
          <Slider minimumValue={50} maximumValue={300} value={tamanhoImagem} onValueChange={setTamanhoImagem} />
        </ScrollView>
      ) : (
        <Text style={[styles.aviso, modoNoturno && styles.textoNoturno]}>Nenhum planeta selecionado.</Text>
      )}

      <View style={styles.switchContainer}>
        <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Modo Noturno</Text>
        <Switch value={modoNoturno} onValueChange={setModoNoturno} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  modoNoturno: { backgroundColor: '#222' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  textoNoturno: { color: '#fff' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  resultado: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  descricao: { fontSize: 16, textAlign: 'justify', marginTop: 10 },
  aviso: { textAlign: 'center', fontSize: 16, marginTop: 20, color: 'red' },
  label: { fontSize: 16, marginTop: 20 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }
});

export default PlanetasApp;
