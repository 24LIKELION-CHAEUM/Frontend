document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("access");

    async function fetchNotifications() {
        const url = '/notifications/';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    function displayNotifications(notifications) {
        const notificationList = document.querySelector('.notification-list');
        notificationList.innerHTML = '';  // 기존 내용 초기화
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            notificationItem.innerHTML = `
                <img src="/assets/medecine.png" class="notification-image" alt="대체 텍스트">
                <div class="notification-details">
                    <div class="notification-meta">
                        <span class="task-date">할 일 ID: ${notification.task}</span>
                        <span class="task-time"> | 알림 시간: ${notification.notify_time}</span>
                    </div>
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.type}</div>
                </div>
            `;
            notificationList.appendChild(notificationItem);
            
            // 알림 읽음 처리 이벤트 리스너 추가
            notificationItem.addEventListener('click', () => {
                markAsRead(notification.id);
            });
        });

        // 텍스트 길이 제한 함수 호출
        truncateTextElements();
    }

    //알림읽음
    async function markAsRead(notificationID) {
        const url = `/notifications/${notificationID}/check_read/`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Notification marked as read:', data);
            fetchNotifications();  // 알림 목록 다시 불러오기
            fetchUnreadCount(); // 읽지 않은 알림 개수 업데이트
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    //  읽지 않은 알림 개수 가져오기
    async function fetchUnreadCount() {
        const url = '/notifications/unread_count/';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayUnreadCount(data.unread_count);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    }

    function displayUnreadCount(count) {
        const unreadCountElement = document.getElementById('unread-count');
        if (unreadCountElement) {
            unreadCountElement.textContent = `읽지 않은 알림: ${count}개`;
        }
    }

    // 알림 삭제하기
    async function deleteNotification(notificationID) {
        const url = `/notifications/${notificationID}/`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Notification deleted');
            fetchNotifications();  // 알림 목록 다시 불러오기
            fetchUnreadCount(); // 읽지 않은 알림 개수 업데이트
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }

    //텍스트 길이 제한
    function truncateText(element, maxLength) {
        let text = element.textContent;
        if (text.length > maxLength) {
            element.textContent = text.slice(0, maxLength) + '...';
        }
    }

    function truncateTextElements() {
        let titleElements = document.querySelectorAll('.notification-title');
        let messageElements = document.querySelectorAll('.notification-message');

        titleElements.forEach(function(element) {
            truncateText(element, 18);
        });
        messageElements.forEach(function(element) {
            truncateText(element, 24);
        });
    }

    // 초기화
    fetchNotifications();
    fetchUnreadCount(); // 페이지 로드 시 읽지 않은 알림 개수 가져오기
});
