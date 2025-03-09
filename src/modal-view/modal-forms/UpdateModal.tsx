import { FC, useState } from 'react'
import styles from './UpdateModal.module.scss'
import { networkService } from '../../services/network.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IPost, IPostId, ResponseIPost } from '../../types'


interface UpdateModalProps extends IPostId {}

const UpdateModal: FC<UpdateModalProps> = (props) => {
    const { id } = props

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const queryClient = useQueryClient()

    function useListUpdate() {
        return useMutation({
            mutationKey: ['update list'],
            mutationFn: networkService.updatePost,
            onSuccess: (response, variable: {id: IPost['id'], payload: Omit<IPost, 'id'> }) => {
                queryClient.setQueryData(
                    ['get list'],
                    (prev: ResponseIPost) => prev.map(item => item.id === variable.id ? response : item)
                );
                alert('Данные успешно изменились')
            },
            onError: (error) => {
                console.warn('error update -> ', error);
            }
        })
    }
    const updateList = useListUpdate()

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTitle('')
        setBody('')
        e.preventDefault()
         updateList.mutate({
            id,
            payload: {title, body}
        })
    }

    const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value)
    }

    const onChangeBody: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setBody(e.target.value)
    }

    return (
        <form className={styles.main}>
            <input className={styles.input} 
                   type="text" 
                   placeholder='Редактировать название'
                   value={title} 
                   onChange={onChangeTitle} />
            <input className={styles.input} 
                   type="text" 
                   placeholder='Редактировать описание'
                   value={body} 
                   onChange={onChangeBody} />
        <button onClick={handleUpdate}>
            Обновить данные
        </button>
    </form>
    )
}
export default UpdateModal