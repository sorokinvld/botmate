import {
  useFiltersControllerSaveFiltersMutation,
  useFiltersControllerGetFiltersQuery,
  FiltersControllerGetFiltersApiArg,
} from '@api';
import { useActiveBot, useActiveChat } from '@hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';

type UseFilters = {} & Pick<FiltersControllerGetFiltersApiArg, 'type'>;

export const useFilters = ({ type }: UseFilters) => {
  const form = useForm();
  const activeBot = useActiveBot();
  const activeChat = useActiveChat();

  const [saveFilter, { isLoading: isSaving }] =
    useFiltersControllerSaveFiltersMutation();
  const { data } = useFiltersControllerGetFiltersQuery({
    botId: activeBot?.id,
    chatId: activeChat?.chat_id,
    type,
  });

  useEffect(() => {
    if (data) {
      form.reset(data.value);
    }
  }, [data]);

  const saveData = () => {
    const data = form.getValues();

    saveFilter({
      botId: activeBot?.id,
      chatId: activeChat?.chat_id,
      saveFilterDto: {
        type,
        value: data,
      },
    }).then(() => {
      toast.success('Filter saved', {
        icon: <HiCheck />,
        progressStyle: {
          backgroundColor: '#49b793',
        },
      });
    });
  };

  return {
    form,
    isSaving,
    saveData,
  };
};
