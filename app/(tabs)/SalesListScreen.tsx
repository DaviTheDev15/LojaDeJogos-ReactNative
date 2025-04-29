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

    const onAdd = (games_purchased: string, purchase_value: number, date: string, purchaser: string) => {
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
        setModalVisible(false)
    };

    
    const openModal = () => {
        setModalVisible(true);
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
                {sales.map(sale => <Sales key={sale.id} games_purchased={sale.games_purchased} purchase_value={sale.purchase_value} date={sale.date} purchaser={sale.purchaser}/>)}
            </ThemedView>

            <SaleModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
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
        backgroundColor: 'gray',
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
    }
})