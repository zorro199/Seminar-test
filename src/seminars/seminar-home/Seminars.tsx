import styles from './Seminars.module.scss'
import { networkService } from '../../services/network.service'
import { useQueries, useQuery } from '@tanstack/react-query'
import SeminarItem from '../items/SeminarItem'


const Seminars = () => {

    const { data: getSeminars, isLoading } = useQuery(
            {
                queryKey: ['get list'],
                queryFn: () => networkService.getData(),
            }
        )

    if (isLoading) {
        return <div style={{color: 'red', fontSize: '30px' }}>Загрузка...</div>
    } 

    return (
        <div className={styles.main}>
            <header className={styles.header}>Seminars Posts</header>
            <div className={styles.item_list}>
                {
                    getSeminars?.length ? (
                        getSeminars?.map(item => (
                            <SeminarItem key={item.id} 
                                         item={item} />
                        ))
                    ) : (
                        <div className={styles.error}>Посты не найдены</div>
                    )
                }
            </div>
        </div>
    )
}
export default Seminars