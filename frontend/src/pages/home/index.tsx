import { useSelector } from 'react-redux';
import { Navbar } from '../../scenes/navbar';
import { Box, useMediaQuery } from '@mui/material';
import { Posts } from '../../scenes/widgets/Posts';
import { MyPost } from '../../scenes/widgets/MyPost';
import { Advert } from '../../scenes/widgets/Advert';
import { FriendList } from '../../scenes/widgets/FriendList';
import { InitialState } from '../../interfaces/initialState';
import { UserWidget } from '../../scenes/widgets/UserWidget';

export const Home = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { _id, picturePath } = useSelector((state: InitialState) => state.user);

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        gap="0.5rem"
        padding="2rem 6%"
        justifyContent="space-between"
        display={isNonMobileScreens ? 'flex' : 'block'}
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          mt={isNonMobileScreens ? undefined : '2rem'}
          flexBasis={isNonMobileScreens ? '42%' : undefined}
        >
          <MyPost picturePath={picturePath} />

          <Posts userId={_id} />
        </Box>

        {isNonMobileScreens ? (
          <Box flexBasis="26%">
            <Advert />

            <Box m="2rem 0" />

            <FriendList userId={_id} />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
