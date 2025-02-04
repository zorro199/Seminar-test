import styles from './Seminars.module.scss'
import { networkService } from '../../services/network.service'
import { useQueries } from '@tanstack/react-query'
import SeminarItem from '../items/SeminarItem'

// Локально развернутый простенький json-server (npm i json-server)
// данные находятся в файле db.json() 
// его путь по умолчания http://localhost:3000/seminars
// для запуска сервера нужно ввести в строке npx json-server db.json
// после обновления логики работы с апи иногда требуется перезапуск сервера 

const Seminars = () => {

    // использование библиотеки react-query для более удобной и полезной работы с апи
    const [getSeminars] = useQueries({
        queries: [
            {
                queryKey: ['get-seminars'],
                queryFn: () => networkService.getData()
            }
        ]
    })
    
    return (
        <div className={styles.main}>
            <header className={styles.header}>Seminars Test</header>
            <div className={styles.item_list}>
                {
                    getSeminars.data?.length ? (
                        getSeminars.data?.map(item => (
                            <SeminarItem key={item.id}
                                         id={item.id} 
                                         title={item.title} 
                                         description={item.description} 
                                         date={item.date} 
                                         time={item.time} />
                        ))
                    ) : (
                        <div className={styles.error}>Семинары не найдены</div>
                    )
                }
            </div>
        </div>
    )
}
export default Seminars