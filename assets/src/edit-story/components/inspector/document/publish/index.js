/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useCallback } from 'react';
import styled from 'styled-components';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Row, DropDown, Label, Media, Required } from '../../../form';
import useInspector from '../../../inspector/useInspector';
import { useStory } from '../../../../app/story';
import { useConfig } from '../../../../app/config';
import PanelTitle from '../../../panels/panel/shared/title';
import PanelContent from '../../../panels/panel/shared/content';
import Panel from '../../../panels/panel/panel';
import PublishTime from './publishTime';

const LabelWrapper = styled.div`
  width: 106px;
`;

const FieldLabel = styled(Label)`
  flex-basis: ${({ width }) => (width ? width : '64px')};
`;

const MediaWrapper = styled.div`
  flex-basis: 134px;
`;

function PublishPanel() {
  const {
    state: { users, isUsersLoading },
  } = useInspector();

  const {
    isSaving,
    author,
    featuredMediaUrl,
    publisherLogoUrl,
    updateStory,
  } = useStory(
    ({
      state: {
        meta: { isSaving },
        story: { author, featuredMediaUrl, publisherLogoUrl },
      },
      actions: { updateStory },
    }) => {
      return {
        isSaving,
        author,
        featuredMediaUrl,
        publisherLogoUrl,
        updateStory,
      };
    }
  );

  const { capabilities } = useConfig();

  const handleChangeCover = useCallback(
    (image) =>
      updateStory({
        properties: {
          featuredMedia: image.id,
          featuredMediaUrl: image.sizes?.medium?.url || image.url,
        },
      }),
    [updateStory]
  );

  // @todo Enforce square image while selecting in Media Library.
  const handleChangePublisherLogo = useCallback(
    (image) => {
      updateStory({
        properties: {
          publisherLogo: image.id,
          publisherLogoUrl: image.sizes?.thumbnail?.url || image.url,
        },
      });
    },
    [updateStory]
  );

  const handleChangeValue = useCallback(
    (prop) => (value) => updateStory({ properties: { [prop]: value } }),
    [updateStory]
  );

  const authorLabel = __('Author', 'web-stories');
  return (
    <Panel name="publishing">
      <PanelTitle>{__('Publishing', 'web-stories')}</PanelTitle>
      <PanelContent padding={'10px 10px 10px 20px'}>
        <PublishTime />
        {capabilities && capabilities.hasAssignAuthorAction && users && (
          <Row>
            <FieldLabel>{authorLabel}</FieldLabel>
            {isUsersLoading ? (
              <DropDown
                ariaLabel={authorLabel}
                placeholder={__('Loading…', 'web-stories')}
                disabled
                lightMode={true}
              />
            ) : (
              <DropDown
                ariaLabel={authorLabel}
                options={users}
                value={author}
                disabled={isSaving}
                onChange={handleChangeValue('author')}
                lightMode={true}
              />
            )}
          </Row>
        )}
        <Row>
          {/* @todo Replace this with selection to choose between publisher logos */}
          <LabelWrapper>
            <FieldLabel>{__('Publisher Logo', 'web-stories')}</FieldLabel>
            <Required />
          </LabelWrapper>
          <MediaWrapper>
            <Media
              value={publisherLogoUrl}
              onChange={handleChangePublisherLogo}
              title={__('Select as publisher logo', 'web-stories')}
              buttonInsertText={__('Select as publisher logo', 'web-stories')}
              type={'image'}
              size={80}
            />
          </MediaWrapper>
        </Row>
        <Row>
          <LabelWrapper>
            <FieldLabel>{__('Cover Image', 'web-stories')}</FieldLabel>
            <Required />
          </LabelWrapper>
          <MediaWrapper>
            <Media
              value={featuredMediaUrl}
              onChange={handleChangeCover}
              title={__('Select as cover image', 'web-stories')}
              buttonInsertText={__('Select as cover image', 'web-stories')}
              type={'image'}
            />
          </MediaWrapper>
        </Row>
      </PanelContent>
    </Panel>
  );
}

export default PublishPanel;
