import { FC, useState } from 'react'
import styles from './SeminarItem.module.scss'
import Modal from '../../modal-view/Modal'
import DeleteModal from '../../modal-view/modal-forms/DeleteModal'
import UpdateModal from '../../modal-view/modal-forms/UpdateModal'
import { IPost } from '../../types'

interface SeminarItemProps {
    item: IPost
}

const SeminarItem: FC<SeminarItemProps> = (props) => {

    const { item } = props

    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <div className={styles.title}>
                    <b>Название: </b> <i>{item.title}</i>
                </div>
                <div className={styles.description}>
                    <b>Описание: </b> <i>{item.body}</i>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.delete} 
                        onClick={() => setDeleteModal(true)}>
                        УДАЛИТЬ
                </button>
                <button className={styles.edit} 
                        onClick={() => setUpdateModal(true)}>
                        ИЗМЕНИТЬ
                </button>
            </div>
            <Modal visible={deleteModal} setVisible={setDeleteModal}>
                <DeleteModal id={item.id}/>
            </Modal>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <UpdateModal id={item.id}/>
            </Modal>
        </div>
    )
}
export default SeminarItem