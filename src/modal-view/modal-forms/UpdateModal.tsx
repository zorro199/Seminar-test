import { FC, useState } from 'react'
import styles from './UpdateModal.module.scss'
import { networkService } from '../../services/network.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'


interface UpdateModalProps {
    id: number
}

const UpdateModal: FC<UpdateModalProps> = (props) => {
    const { id,} = props

    const [updateTitle, setUpdateTitle] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')

    const queryClient = useQueryClient()

    // useMutation для работы с мутациями 
    const { mutate } = useMutation({
      mutationKey: ['update-seminar'],
      mutationFn: () => networkService.updateSeminar(id, updateTitle, updateDescription),
      onSuccess() {
        setUpdateTitle('')
        setUpdateDescription(''),
        queryClient.refetchQueries({ // для обновления списка без перезагрузки
          queryKey: ['get-seminars'] // по ключу 
       })
     }
    })

    return (
        <form className={styles.main}>
            <input className={styles.input} 
                   type="text" placeholder='Редактировать название' 
                   onChange={e => setUpdateTitle(e.target.value)} />
            <input className={styles.input} 
                   type="text" 
                   placeholder='Редактировать описание' 
                   onChange={e => setUpdateDescription(e.target.value)} />
        <button onClick={() => mutate()}>
            Обновить данные
        </button>
    </form>
    )
}
export default UpdateModal