<?php

function fett_form_system_theme_settings_alter(&$form, $form_state, $form_id = NULL) {
  if (isset($form_id)) return;

  // Variables
  $path_fett = drupal_get_path('theme', 'fett');
  $sonar_enabled = module_exists('sonar');
  $theme_name = $form_state['build_info']['args'][0];
  $configured = variable_get("theme_{$theme_name}_settings", FALSE);
  $css_mode = variable_get('preprocess_css', '') == 1 ? TRUE : FALSE;
  $js_mode = variable_get('preprocess_js', '') == 1 ? TRUE : FALSE;

  // Includes
  include_once './' . $path_fett . '/includes/foundation.inc';
  include_once './' . $path_fett . '/includes/tools.inc';
  $form['#attached']['js'][] = $path_fett .'/assets/js/fett.theme.settings.js';

  // Set defaults if necessary
  _fett_defaults();

  $title = 'Fe&#8224;&#8224;';
  if($theme_name !== 'fett'){
    $themes = list_themes();
    $theme = $themes[$theme_name];
    $title = $theme->name . ' <small><em>a lowly clone of</em> '.$title.'</small>';
  }

  $form['fett'] = array(
    '#type'   => 'vertical_tabs',
    '#weight' => -10,
    '#prefix' => '<h1>' . $title . '</h1>',
  );


  //////////////////////////////////////////////////////////////////////////////
  // CSS
  //////////////////////////////////////////////////////////////////////////////

  $form['fett']['css'] = array(
      '#type'        => 'fieldset',
      '#title'       => t('CSS'),
  );

  // Aggregation overrides, see http://drupal.org/node/1115026
  if ($css_mode == FALSE) {
    $css_mode_message = t('CSS aggregation is OFF. This settings will have no effect until CSS aggregation is turned ON.');
  }
  else {
    $css_mode_message = t('CSS aggregation is ON. This settings will take effect.');
  }
  // Combine CSS
  $form['fett']['css']['css_onefile'] = array(
    '#type' => 'checkbox',
    '#title'  => t('Combine CSS Files'),
    '#description' => t('In Fett you will normally get three media type CSS files after this is enabled and CSS aggregation is turned on - all, screen and only screen. If you are using a print stylesheet this will be seperate also. Browser specific stylesheets for Internet Explorer are ignored.<br><small>!css_mode_message</small>', array('!css_mode_message' => $css_mode_message)),
    '#default_value' => fett_get_setting('css_onefile'),
  );

  require_once($path_fett . '/settings/css.foundation.inc');
  fett_settings_css_foundation_form($form['fett']['css'], $theme_name);

  require_once($path_fett . '/settings/css.exclude.inc');
  fett_settings_css_exclude_form($form['fett']['css'], $theme_name);

  //////////////////////////////////////////////////////////////////////////////
  // JS
  //////////////////////////////////////////////////////////////////////////////

  $form['fett']['js'] = array(
    '#type' => 'fieldset',
    '#title' => t('Javascript'),
  );

  if ($js_mode == FALSE) {
    $js_mode_message = t('JavaScript aggregation is OFF. This settings will have no effect until JavaScript aggregation is turned ON.');
  }
  else {
    $js_mode_message = t('JavaScript aggregation is ON. This settings will take effect.');
  }
  // Combine JS
  $form['fett']['js']['js_onefile'] = array(
    '#type' => 'checkbox',
    '#title'  => t('Combine JS Files'),
    '#description' => t('This will force all aggregated JavaScript files into one file.<br><small>!js_mode_message</small>', array('!js_mode_message' => $js_mode_message)),
    '#default_value' => fett_get_setting('js_onefile'),
  );

  require_once($path_fett . '/settings/js.foundation.inc');
  fett_settings_js_foundation_form($form['fett']['js'], $theme_name);


  //////////////////////////////////////////////////////////////////////////////
  // Off-canvas
  //////////////////////////////////////////////////////////////////////////////

  $form['fett']['offcanvas'] = array(
    '#type' => 'fieldset',
    '#title' => t('Off-canvas'),
  );

  require_once($path_fett . '/settings/offcanvas.inc');
  fett_settings_offcanvas_form($form['fett']['offcanvas'], $theme_name);


  //////////////////////////////////////////////////////////////////////////////
  // Tools
  //////////////////////////////////////////////////////////////////////////////

  $form['fett']['tools'] = array(
    '#type' => 'fieldset',
    '#title' => t('Tools'),
  );

  $form['fett']['tools']['megamenu'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Mega Menu'),
    '#default_value' => fett_get_setting('megamenu'),
    '#description' => t('The main menu will be converted into mega-menu/dropdown ready markup.'),
  );

  $form['fett']['tools']['html_tags'] = array(
    '#type' => 'checkbox',
    '#title' => t('Prune HTML Tags'),
    '#default_value' => fett_get_setting('html_tags'),
    '#description' => t('Prunes your <code>style</code>, <code>link</code>, and <code>script</code> tags as <a href="!link" target="_blank"> suggested by Nathan Smith</a>.', array('!link' => 'http://sonspring.com/journal/html5-in-drupal-7#_pruning')),
  );


  //////////////////////////////////////////////////////////////////////////////
  // General
  //////////////////////////////////////////////////////////////////////////////

  $form['fett']['fett_general'] = array(
    '#type' => 'fieldset',
    '#title' => t('General'),
  );

  if(isset($form['theme_settings'])){
    $form['fett']['fett_general']['theme_settings'] = $form['theme_settings'];
    $form['fett']['fett_general']['logo'] = $form['logo'];
    $form['fett']['fett_general']['favicon'] = $form['favicon'];
    unset($form['theme_settings']);
    unset($form['logo']);
    unset($form['favicon']);
  }

  $form['#submit'][] = 'fett_settings_submit';
}

function fett_settings_submit($form, &$form_state){
  drupal_theme_rebuild();
}

function fett_settings_validate_cleanup($element, &$form_state, $form) {
  if(isset($form_state['values'][$element['#name']]) && is_array($form_state['values'][$element['#name']])){
    $form_state['values'][$element['#name']] = array_values(array_filter($form_state['values'][$element['#name']]));
    if(empty($form_state['values'][$element['#name']])){
      unset($form_state['values'][$element['#name']]);
    }
  }
}
