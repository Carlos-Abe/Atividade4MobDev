import React, { useState } from 'react'; 
import { View, Text, TextInput, Switch, Button, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const planetas = {
  "Mercúrio": { imagem: require('./assets/mercurio.png'), descricao: "Mercúrio é o menor e mais interno planeta do Sistema Solar.", distanciaSol: "57.9 milhões km", composicao: "Rochoso", rotacao: "58.6 dias" },
  "Vênus": { imagem: require('./assets/venus.png'), descricao: "Vênus é semelhante à Terra em tamanho.", distanciaSol: "108.2 milhões km", composicao: "Rochoso", rotacao: "243 dias" },
  "Terra": { imagem: require('./assets/terra.png'), descricao: "A Terra é o único planeta conhecido por abrigar vida.", distanciaSol: "149.6 milhões km", composicao: "Rochoso", rotacao: "24 horas" },
  "Marte": { imagem: require('./assets/marte.png'), descricao: "Marte é conhecido como o 'planeta vermelho' devido ao óxido de ferro em sua superfície.", distanciaSol: "227.9 milhões km", composicao: "Rochoso", rotacao: "24.6 horas" },
  "Júpiter": { imagem: require('./assets/jupiter.png'), descricao: "Júpiter é o maior planeta do Sistema Solar.", distanciaSol: "778.3 milhões km", composicao: "Gasoso", rotacao: "9.9 horas" },
  "Saturno": { imagem: require('./assets/saturno.png'), descricao: "Saturno é famoso por seus anéis compostos de gelo e poeira.", distanciaSol: "1.429 bilhões km", composicao: "Gasoso", rotacao: "10.7 horas" },
  "Urano": { imagem: require('./assets/urano.png'), descricao: "Urano é um gigante gasoso gelado.", distanciaSol: "2.870 bilhões km", composicao: "Gasoso", rotacao: "17.2 horas" },
  "Netuno": { imagem: require('./assets/netuno.png'), descricao: "Netuno é o planeta mais distante do Sol.", distanciaSol: "4.495 bilhões km", composicao: "Gasoso", rotacao: "16.1 horas" },
  "Sol": { imagem: require('./assets/sol.png'), descricao: "O Sol é a estrela central do nosso Sistema Solar.", distanciaSol: "0 km", composicao: "Estelar", rotacao: "25 dias" }
};


const PlanetasApp = () => {
  const [pesquisa, setPesquisa] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const [modoNoturno, setModoNoturno] = useState(false);
  const [tamanhoImagem, setTamanhoImagem] = useState(100);
  const [brilhoImagem, setBrilhoImagem] = useState(1);
  const [mostrarInfoExtra, setMostrarInfoExtra] = useState(false);
  const [picker1, setPicker1] = useState('');
  const [picker2, setPicker2] = useState('');

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
          <Image source={planetas[selecionado].imagem} style={{ width: tamanhoImagem, height: tamanhoImagem, opacity: brilhoImagem, alignSelf: 'center' }} />
          <Text style={[styles.descricao, modoNoturno && styles.textoNoturno]}>{planetas[selecionado].descricao}</Text>
          
          {mostrarInfoExtra && (
            <View>
              <Text style={[styles.infoExtra, modoNoturno && styles.textoNoturno]}>Distância do Sol: {planetas[selecionado].distanciaSol}</Text>
              <Text style={[styles.infoExtra, modoNoturno && styles.textoNoturno]}>Composição: {planetas[selecionado].composicao}</Text>
              <Text style={[styles.infoExtra, modoNoturno && styles.textoNoturno]}>Tempo de Rotação: {planetas[selecionado].rotacao}</Text>
            </View>
          )}
          
          <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Tamanho da imagem:</Text>
          <Slider minimumValue={50} maximumValue={300} value={tamanhoImagem} onValueChange={setTamanhoImagem} />
          
          <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Brilho da imagem:</Text>
          <Slider minimumValue={0.1} maximumValue={1} value={brilhoImagem} onValueChange={setBrilhoImagem} />
          
          <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Escolha uma opção:</Text>
          <Picker selectedValue={picker1} onValueChange={setPicker1}>
            <Picker.Item label="Opção 1" value="opcao1" />
            <Picker.Item label="Opção 2" value="opcao2" />
          </Picker>
          
          <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Escolha outra opção:</Text>
          <Picker selectedValue={picker2} onValueChange={setPicker2}>
            <Picker.Item label="Alternativa A" value="a" />
            <Picker.Item label="Alternativa B" value="b" />
          </Picker>
          
          <View style={styles.buttonContainer}>
            <Button title="Mostrar Info" onPress={() => alert(`Planeta: ${selecionado}`)} />
            <Button title="Limpar Seleção" onPress={() => setSelecionado(null)} />
          </View>
        </ScrollView>
      ) : (
        <Text style={[styles.aviso, modoNoturno && styles.textoNoturno]}>Nenhum planeta selecionado.</Text>
      )}

      <View style={styles.switchContainer}>
        <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Modo Noturno</Text>
        <Switch value={modoNoturno} onValueChange={setModoNoturno} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, modoNoturno && styles.textoNoturno]}>Mostrar Info Extra</Text>
        <Switch value={mostrarInfoExtra} onValueChange={setMostrarInfoExtra} />
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
  infoExtra: { fontSize: 14, marginTop: 5, fontStyle: 'italic' },
  aviso: { textAlign: 'center', fontSize: 16, marginTop: 20, color: 'red' },
  label: { fontSize: 16, marginTop: 20 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }
});

export default PlanetasApp;
