#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int n; // Total number of entries
void my_strcpy(char arr1[], char arr2[], int n)
{
    int x;
    for (x = 0; x < n; x++)
    {
        if (arr1[x] == '\0')
        {
            arr2[x] = '\0';
            break;
        }
        arr2[x] = arr1[x];
    }
}

int is_empty(int queue[], int n)
{
    int z;
    for (z = 0; z < n; z++)
    {
        if (queue[z] != -1)
        {
            return 0;
        }
    }
    return 1;
}

void enQueue(int queue[], int n, int index, int front, int arrival_times[])
{
    int i;
    for (i = 0; i < n; i++)
    {
        int idx = (front + i) % n;
        // printf("Queue[i] = %i\n", queue[idx]);
        if (queue[idx] == -1)
        {
            queue[idx] = index;
            break;
        }
        else if (arrival_times[queue[idx]] > arrival_times[index] || (arrival_times[queue[idx]] == arrival_times[index] && queue[idx] > index))
        {
            int idx2 = idx;
            int previous = queue[idx];
            while (idx < n - 1)
            {
                int tmp = queue[idx + 1];
                queue[idx + 1] = previous;
                previous = tmp;
                idx++;
            }
            queue[idx2] = index;
            break;
        }
    }
}

void rearrange_Queue(int queue[], int tmp_queue_index, int n)
{
    int tmp = tmp_queue_index + 1;
    if (tmp < n)
    {
        while (queue[tmp] != -1)
        {
            queue[tmp - 1] = queue[tmp];
            queue[tmp] = -1;
            tmp++;
            if (tmp >= n)
            {
                break;
            }
        }
    }
}

void allocating_tickets(char priority_levels[n][7], int n, int tickets[n][2], int durations[])
{
    int i;
    int ticket_no = 0;
    for (i = 0; i < n; i++)
    {
        if (durations[i] == 0)
        {
            continue;
        }
        if (strcmp(priority_levels[i], "low") == 0)
        {
            tickets[i][0] = ticket_no;
            ticket_no += 1;
            tickets[i][1] = ticket_no;
        }
        else if (strcmp(priority_levels[i], "normal") == 0)
        {
            tickets[i][0] = ticket_no;
            ticket_no += 2;
            tickets[i][1] = ticket_no;
        }
        else if (strcmp(priority_levels[i], "high") == 0)
        {
            tickets[i][0] = ticket_no;
            ticket_no += 3;
            tickets[i][1] = ticket_no;
        }
    }
}

int main()
{
    // Enter your code here. Read input from STDIN. Print output to STDOUT

    // Initializing variables/arrays

    scanf("%i", &n);
    // printf("%i", n);
    char process_names[n][11];
    int arrival_times[n];
    // int arrival_times_sorted[n];
    // char priority_levels_sorted[n][7];
    int durations[n];
    char priority_levels[n][7];
    int i, j;

    // Storing data into arrays
    for (i = 0; i < n; i++)
    {
        scanf("%*c%[^:]%*c%i:%i:%s", process_names[i], &arrival_times[i], &durations[i], priority_levels[i]);
    }

    // Printing data for confirmation
    // for (i=0 ; i< n; i++){
    //  printf("\nProcess Name: %s, Arrival Time: %i, Duration: %i, Priority Level: %s", process_names[i], arrival_times[i], durations[i], priority_levels[i]);
    // }

    // Sorting with respect to arrival time
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n - i - 1; j++)
        {
            if (arrival_times[j] > arrival_times[j + 1])
            {
                int temp = arrival_times[j];
                arrival_times[j] = arrival_times[j + 1];
                arrival_times[j + 1] = temp;
                int temp1 = durations[j];
                durations[j] = durations[j + 1];
                durations[j + 1] = temp1;
                char temp2[7];
                my_strcpy(priority_levels[j], temp2, 7);
                my_strcpy(priority_levels[j + 1], priority_levels[j], 7);
                my_strcpy(temp2, priority_levels[j + 1], 7);
                char temp3[11];
                my_strcpy(process_names[j], temp3, 11);
                my_strcpy(process_names[j + 1], process_names[j], 11);
                my_strcpy(temp3, process_names[j + 1], 11);
            }
        }
    }

    // Allocating tickets
    int tickets[n][2];
    allocating_tickets(priority_levels, n, tickets, durations);
    // for(i=0;i<n;i++){
    //     if (strcmp(priority_levels[i], "low")==0){
    //         tickets[i][0] = ticket_no;
    //         ticket_no += 1;
    //         tickets[i][1] = ticket_no;
    //     }
    //     else if (strcmp(priority_levels[i], "normal")==0){
    //         tickets[i][0] = ticket_no;
    //         ticket_no += 2;
    //         tickets[i][1] = ticket_no;
    //     }
    //     else if (strcmp(priority_levels[i], "high")==0){
    //         tickets[i][0] = ticket_no;
    //         ticket_no += 3;
    //         tickets[i][1] = ticket_no;
    //     }
    // }

    // Printing for sorting confirmation
    // for (i=0 ; i< n; i++){
    //  printf("\nProcess Name: %s, Arrival Time: %i, Duration: %i, Tickets: [%i, %i)", process_names[i], arrival_times[i], durations[i], tickets[i][0], tickets[i][1]);
    // }

    srand(1);

    // Initializing Queue
    int queue[n];
    for (i = 0; i < n; i++)
    {
        queue[i] = -1;
    }

    int time = 1;
    int queue_index = 0;
    int arr_index = 0;
    int process_index;
    int queue_front = 0;
    // int used_tickets[ticket_no];
    int usd_idx = 0;

    int ticket_no = 0;
    int completed_processes = 0;
    while (completed_processes != n)
    {

        // No process arrived and Queue is empty
        if (arrival_times[arr_index] != time && is_empty(queue, n) == 1)
        {
            printf("%i:idle:empty\n", time);
            time++;
            continue;
        }

        // A process arrives
        else if (arrival_times[arr_index] == time)
        {
            //     int v=0;
            //     while(v< n){
            //     int tmp_idx = queue[v];
            //     if (tmp_idx != -1){
            //         printf("Process Name: %s, Arrival Time: %i, Duration: %i, Tickets: [%i, %i)\n",    process_names[tmp_idx], arrival_times[tmp_idx], durations[tmp_idx], tickets[tmp_idx][0], tickets[tmp_idx][1]);
            //     }
            // v++;
            // }
            // printf("\n");

            // For all the processes that are coming at the current time

            while (arrival_times[arr_index] == time)
            {

                enQueue(queue, n, arr_index, queue_front, arrival_times);
                // queue[queue_index] = arr_index;
                // printf("%s, added\n", process_names[arr_index]);
                //         v= 0;
                //             while(v< n){
                //     int tmp_idx = queue[v];
                //     if (tmp_idx != -1){
                //         printf("Process Name: %s, Arrival Time: %i, Duration: %i, Tickets: [%i, %i)\n",    process_names[tmp_idx], arrival_times[tmp_idx], durations[tmp_idx], tickets[tmp_idx][0], tickets[tmp_idx][1]);
                //     }
                // v++;
                // }
                // printf("\n");
                queue_index++;
                ticket_no += tickets[arr_index][1] - tickets[arr_index][0];
                // printf("Tickets2: %i\n", ticket_no);
                arr_index++;
            }
        }
        // printf("Front: %i\n", queue[queue_front]);
        // printf("Tickets: %i\n", ticket_no);
        // Random Ticket
        int rnd = rand() % ticket_no;
        // used_tickets[usd_idx] = rnd;
        int i = 0;
        int ticket_process_running = 0;
        for (i = 0; i < n; i++)
        {
            if (queue[i] != -1)
            {
                if (tickets[queue[i]][0] <= rnd && rnd < tickets[queue[i]][1])
                {
                    ticket_process_running = 1;
                    break;
                }
            }
        }
        if (ticket_process_running == 0)
        {
            printf("Rand = %i\n", rnd);
            continue;
        }
        // printf("Rand = %i\n", rnd);
        int tmp_queue_index = 0;
        int tmp_index = queue[tmp_queue_index];
        // Looking for the process that mathces the ticket
        while (tmp_index != -1 && tmp_queue_index < n)
        {
            if (tickets[tmp_index][0] <= rnd && rnd < tickets[tmp_index][1])
            {
                // Scheduling a process given that its remaining time is not zero
                if (durations[tmp_index] != 0)
                {
                    process_index = tmp_index;
                    // printf("%s is scheduled\n", process_names[process_index]);
                    queue[tmp_queue_index] = -1;
                    rearrange_Queue(queue, tmp_queue_index, n);
                }
            }
            tmp_queue_index++;
            tmp_index = queue[tmp_queue_index];
        }
        printf("%i:%s:", time, process_names[process_index]);
        durations[process_index] -= 1;
        if (is_empty(queue, n) == 1)
        {
            printf("empty\n");
        }
        else
        {
            int queue_index_2 = 0;
            while (queue_index_2 < n)
            {
                if (queue[queue_index_2] != -1)
                {
                    printf("%s,", process_names[queue[queue_index_2]]);
                }
                queue_index_2++;
            }
            printf("\n");
        }
        int v = 0;
        // while(v< n){
        //     int tmp_idx = queue[v];
        //     if (tmp_idx != -1){
        //         printf("Process Name: %s, Arrival Time: %i, Duration: %i, Tickets: [%i, %i)\n",    process_names[tmp_idx], arrival_times[tmp_idx], durations[tmp_idx], tickets[tmp_idx][0], tickets[tmp_idx][1]);
        //     }
        // v++;
        // }
        // printf("\n");
        if (durations[process_index] > 0)
        {
            // printf("Front: %i, %i\n", queue[queue_front], process_index);
            enQueue(queue, n, process_index, queue_front, arrival_times);
        }
        else
        {
            completed_processes += 1;
            ticket_no -= (tickets[process_index][1] - tickets[process_index][0]);
            allocating_tickets(priority_levels, n, tickets, durations);
            // printf("Tickets: %i\n", ticket_no);
        }

        v = 0;
        while (v < n)
        {
            int tmp_idx = queue[v];
            if (tmp_idx != -1)
            {
                // printf("Process Name: %s, Arrival Time: %i, Duration: %i, Tickets: [%i, %i)\n",    process_names[tmp_idx], arrival_times[tmp_idx], durations[tmp_idx], tickets[tmp_idx][0], tickets[tmp_idx][1]);
            }
            v++;
        }
        // printf("\n");

        time++;
    }

    return 0;
}
