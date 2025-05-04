import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Sales from '@/components/entities/Sales';
import MyScrollView from '@/components/MyScrollView';
import {useState} from 'react';
import { ISales } from '@/components/interfaces/ISales';
import SaleModal from '@/components/modals/SaleModal';

export default function SaleListScreen(){
    const [sales, setSales] = useState<ISales[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedSale, setSelectedSale] = useState<ISales>();


    const onAdd = (games_purchased: string, purchase_value: number, date: string, purchaser: string, id?: number) => {

        if(!id || id <= 0){
            const newSale: ISales = {
                id: Math.random() * 1000,
                games_purchased: games_purchased,
                purchase_value: purchase_value,
                date: date,
                purchaser: purchaser
            };

            const salePlus: ISales[] = [
                ...sales,
                newSale
            ];
            setSales(salePlus);
        } else {
            sales.forEach(sale => {
                if (sale.id == id){
                    sale.games_purchased = games_purchased;
                    sale.purchase_value = purchase_value;
                    sale.date = date;
                    sale.purchaser = purchaser;
                }
            });
        }
        setModalVisible(false)
    };

        const onDelete = (id: number) => {
            const newSales: Array<ISales> = [];
            for (let index = 0; index < sales.length; index++){
                const sale = sales[index]
                if (sale.id != id){
                    newSales.push(sale);
                }
            }
    
            setSales(newSales);
            setModalVisible(false)
        }
    
    const openModal = () => {
        setSelectedSale(undefined);
        setModalVisible(true);
    }

    const openEditModal = (selectedSale: ISales) =>{
        setSelectedSale(selectedSale);
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <MyScrollView headerBackgroundColor={{light: '#A1CEDC', dark:'#1D3d47'}}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>Add New Sale</Text>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.container}>
                {sales.map(sale => <TouchableOpacity onPress={() => openEditModal(sale)}>
                    <Sales key={sale.id} games_purchased={sale.games_purchased} purchase_value={sale.purchase_value} date={sale.date} purchaser={sale.purchaser}/>
                </TouchableOpacity>)}
                
            </ThemedView>

            <SaleModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                sale={selectedSale}
            />
        </MyScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer:{
        gap: 8,
        marginBottom: 8,
    },
    reactLogo:{
        bottom: 0,
        left: 0,
    },
    container:{
        flex:1,
        backgroundColor: '#005C53',
    },
    headerContainer:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButton:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 20,
        marginTop:50    
    },
})