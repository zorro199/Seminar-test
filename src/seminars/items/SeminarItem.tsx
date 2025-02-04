import { FC, useState } from 'react'
import styles from './SeminarItem.module.scss'
import Modal from '../../modal-view/Modal'
import DeleteModal from '../../modal-view/modal-forms/DeleteModal'
import UpdateModal from '../../modal-view/modal-forms/UpdateModal'

interface SeminarItemProps {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
}

const SeminarItem: FC<SeminarItemProps> = (props) => {

    const { id, title, description, date, time } = props

    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <div className={styles.title}>
                    Название: <i>{title}. состоится: {date}, {time}</i>
                </div>
                <div className={styles.description}>
                    Описание: <i>{description}</i>
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
                <DeleteModal id={id}/>
            </Modal>
            <Modal visible={updateModal} setVisible={setUpdateModal}>
                <UpdateModal id={id}/>
            </Modal>
        </div>
    )
}
export default SeminarItem