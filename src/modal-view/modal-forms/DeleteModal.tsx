import styles from './DeleteModal.module.scss'
import { networkService } from '../../services/network.service'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'

interface DeleteModalProps {
    id: number
}

const DeleteModal: FC<DeleteModalProps> = (props) => {
    const { id } = props

    const queryClient = useQueryClient()
    
    const [getSeminars] = useQueries({
        queries: [
            {
                queryKey: ['get-seminars'],
                queryFn: () => networkService.getData()
            }
        ]
    })

    const handleDeleteItem = async (id: number) => {
        await networkService.deleteSeminar(id)
        queryClient.refetchQueries({ // для обновления списка без перезагрузки
            queryKey: ['get-seminars'] // по ключу 
        })
        getSeminars.data?.filter(item => item.id !== id)
    }

    return (
        <div className={styles.main}>
            <span className={styles.text}> Действительно хотите удалить ? </span>
            <button onClick={() => handleDeleteItem(id)}>УДАЛИТЬ</button>
        </div>
    )
}
export default DeleteModal