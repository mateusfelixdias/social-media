import Dropzone from 'react-dropzone';
import * as Material from '@mui/material';
import { actions } from '../../../states';
import * as Icons from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { themeSettings } from '../../../themes';
import { useDispatch, useSelector } from 'react-redux';
import { FlexBetween } from '../../../components/FlexBetween';
import { InitialState } from '../../../interfaces/initialState';
import { WidgetWrapper } from '../../../components/WidgetWrapper';
import { UserImage } from '../../../components/UserImage/UserImage';

const { setPosts } = actions;

interface IPost {
  picturePath: string;
}

export const MyPost = ({ picturePath }: IPost) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isImage, setIsImage] = useState<boolean>(false);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { _id } = useSelector((state: InitialState) => state.user);
  const { token, mode } = useSelector((state: InitialState) => state);

  const { palette } = themeSettings(mode);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = () => {};

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <Material.InputBase
          placeholder="O que você está persando..."
          onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
            setPost(target.value);
          }}
          sx={{
            width: '100%',
            borderRadius: '2rem',
            padding: '1rem 2rem',
            backgroundColor: palette.neutral.light,
          }}
        />
      </FlexBetween>

      {isImage ? (
        <Material.Box
          p="1rem"
          mt="1rem"
          borderRadius="5px"
          border={`1px solid ${medium}`}
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles: Array<File>) => {
              const file = acceptedFiles[0];
              setImage(file.name);
            }}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <FlexBetween>
                  <Material.Box
                    width="100%"
                    {...getRootProps()}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    border={`1px dashed ${palette.primary.main}`}
                  >
                    <input {...getInputProps()} />
                    {!image.length ? (
                      <p style={{ paddingLeft: '0.5rem' }}>Adicionar um post</p>
                    ) : (
                      <FlexBetween>
                        <Material.Typography>
                          <p
                            style={{
                              padding: '0.4rem 0 0.4rem 0.4rem',
                            }}
                          >
                            {image}
                          </p>
                        </Material.Typography>
                        <Icons.EditOutlined />
                      </FlexBetween>
                    )}
                  </Material.Box>
                  {image ? (
                    <Material.IconButton
                      sx={{ width: '15%' }}
                      onClick={() => setImage('')}
                    >
                      <Icons.DeleteOutline />
                    </Material.IconButton>
                  ) : null}
                </FlexBetween>
              );
            }}
          </Dropzone>
        </Material.Box>
      ) : null}

      <Material.Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <Icons.ImageOutlined sx={{ color: mediumMain }} />
          <Material.Typography
            color={mediumMain}
            sx={{ '&hover': { cursor: 'pointer', color: medium } }}
          >
            Imagem
          </Material.Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <Icons.GifBoxOutlined sx={{ color: mediumMain }} />
              <Material.Typography color={mediumMain}>Clip</Material.Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <Icons.AttachFileOutlined sx={{ color: mediumMain }} />
              <Material.Typography color={mediumMain}>
                Acessório
              </Material.Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <Icons.MicOutlined sx={{ color: mediumMain }} />
              <Material.Typography color={mediumMain}>
                Áudio
              </Material.Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <Icons.MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )}

        <Material.Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            borderRadius: '1rem',
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
          }}
        >
          POST
        </Material.Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};
