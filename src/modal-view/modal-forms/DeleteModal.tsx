import styles from './DeleteModal.module.scss'
import { networkService } from '../../services/network.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { IPostId, IPost, ResponseIPost } from '../../types'


interface DeleteModalProps extends IPostId {}

const DeleteModal: FC<DeleteModalProps> = (props) => {
    const { id } = props
    const queryClient = useQueryClient()

    function useListRemove() {
        return useMutation({
            mutationKey: ['delete'],
            mutationFn: networkService.deletePost,
            onSuccess: (_, variable: IPost['id']) => {
                queryClient.setQueryData(
                    ['get list'],
                    (prev: ResponseIPost) => prev.filter(item => item.id !== variable)
                ),
                alert('Пост успешно удален')
            },
            onError: (error) => {
                console.warn('check delete error -> ', error)
            }
        })
    }

    const listRemove = useListRemove()

    const handleDelete = (id: number) => {
        listRemove.mutate(id)
    }

    return (
        <div className={styles.main}>
            <span className={styles.text}> Действительно хотите удалить ?</span>
            <button onClick={() => handleDelete(id)}>УДАЛИТЬ</button>
        </div>
    )
}
export default DeleteModal